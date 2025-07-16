"use client";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionSection from "./_components/QuestionSection";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const RecordAnswerSection = dynamic(() => import("./_components/RecordAnswerSection"), {
  ssr: false,
});

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [interviewQuestions, setInterviewQuestions] = useState();
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [timerStarted, setTimerStarted] = useState(false);
  const router = useRouter();

  const { interviewId } = React.use(params);

  useEffect(() => {
    let timer;
    if (timerStarted && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setTimerStarted(false);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, timerStarted]);

  useEffect(() => {
    getInterviewDetails();
  }, []);

  useEffect(() => {
    setTimeLeft(90);
    setTimerStarted(false);
    setIsAnswered(false);
  }, [activeQuestion]);

  const getInterviewDetails = async () => {
    const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, interviewId));
    const jsonMockResp = JSON.parse(result[0].jsonMockResp);
    setInterviewData(result[0]);
    setInterviewQuestions(jsonMockResp);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-10">
        <QuestionSection
          interviewQuestions={interviewQuestions}
          activeQuestion={activeQuestion}
          timeLeft={timeLeft}
        />

        <RecordAnswerSection
          interviewQuestions={interviewQuestions}
          activeQuestion={activeQuestion}
          interviewData={interviewData}
          setIsAnswered={setIsAnswered}
          setActiveQuestion={setActiveQuestion}
          setTimeLeft={setTimeLeft}
          setTimerStarted={setTimerStarted}
        />
      </div>
    </div>
  );
}

export default StartInterview;