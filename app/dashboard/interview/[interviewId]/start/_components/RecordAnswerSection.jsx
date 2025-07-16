"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { generateContent } from "@/utils/GeminiAIModel";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { Mic, StopCircle } from "lucide-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function RecordAnswerSection({
  interviewQuestions,
  activeQuestion,
  interviewData,
  setIsAnswered,
  setActiveQuestion,
  setTimeLeft,
  setTimerStarted,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { user } = useUser();
  const router = useRouter();

  const {
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({ continuous: true, useLegacyResults: false });

  useEffect(() => {
    if (results.length > 0) {
      setUserAnswer((prev) => prev + results.map((r) => r.transcript).join(" "));
    }
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer?.length > 10 && !submitted) {
      UpdateUserAnswer();
    }
  }, [isRecording, userAnswer]);

  useEffect(() => {
    setUserAnswer("");
    setResults([]);
    setSubmitted(false);
  }, [activeQuestion]);

  useEffect(() => {
  const handleVisibilityChange = () => {
    if (document.hidden && isRecording) {
      stopSpeechToText();       // Stop recording
      setTimerStarted(false);   // Stop timer
      router.replace("/dashboard");
      toast.error("Interview stopped because you switched tabs.");
    }
  };

  document.addEventListener("visibilitychange", handleVisibilityChange);

  return () => {
    document.removeEventListener("visibilitychange", handleVisibilityChange);
  };
  }, [isRecording, stopSpeechToText, setTimerStarted]);

  const StartStopAnswer = () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      setUserAnswer("");
      setResults([]);
      setSubmitted(false);
      setTimeLeft(90);
      setTimerStarted(true);
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    if (submitted || !interviewData || !interviewQuestions[activeQuestion]) return;

    setSubmitted(true);
    setLoading(true);

    const feedbackPrompt = `Question: ${interviewQuestions[activeQuestion]?.question}, User answer: ${userAnswer}. Based on the question and user answer, provide a JSON object with 'rating' (1-10) and 'feedback' (3-4 lines).`;

    try {
      const result = await generateContent(feedbackPrompt);
      const cleanedResp = result.replace(/^```json\s*|\s*```(\s*undefined)?\s*$|\s*undefined\s*$/g, "").replace(/\*+/g, "").trim();
      const JsonFeedbackResponse = JSON.parse(cleanedResp);

      await db.insert(UserAnswer).values({
        mockIdRef: interviewData.mockId,
        question: interviewQuestions[activeQuestion]?.question,
        correctAns: interviewQuestions[activeQuestion]?.answer,
        userAns: userAnswer,
        feedback: JsonFeedbackResponse?.feedback,
        rating: JsonFeedbackResponse?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-YYYY"),
      });

      toast.success("Answer submitted!");

      setIsAnswered(true);

      setTimeout(() => {
        if (activeQuestion === interviewQuestions.length - 1) {
          router.push(`/dashboard/interview/${interviewData.mockId}/feedback`);
        } else {
          setActiveQuestion((prev) => prev + 1);
        }
      }, 1000);
    } catch (err) {
      toast.error("Error generating feedback or saving answer.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="items-center mt-5 p-5 justify-center border-none rounded-lg">
        <Webcam
          mirrored={true}
          style={{ height: 340, width: 400, zIndex: 10, objectFit: "cover" }}
          className="rounded-md"
        />
      </div>

      <Button
        disabled={loading}
        className={`w-[160px] h-[40px] font-semibold text-md mt-2 mb-7 cursor-pointer ${
          isRecording ? "bg-red-700 hover:bg-red-800" : "bg-[#273AC7] hover:bg-[#273AC7]/70"
        }`}
        onClick={StartStopAnswer}
      >
        {isRecording ? (
          <h2 className="flex gap-2 items-center justify-center animate-pulse">
            <StopCircle /> Stop Recording
          </h2>
        ) : (
          <h2 className="flex gap-2 items-center justify-center">
            <Mic /> Record Answer
          </h2>
        )}
      </Button>
    </div>
  );
}

export default RecordAnswerSection;
