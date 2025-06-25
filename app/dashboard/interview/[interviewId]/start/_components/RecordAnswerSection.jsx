"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db';
import { generateContent } from '@/utils/GeminiAIModel';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { Mic, StopCircle } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import useSpeechToText from 'react-hook-speech-to-text';
import Webcam from 'react-webcam';
import { toast } from 'sonner';

function RecordAnswerSection({interviewQuestions,activeQuestion,interviewData}) {
  const [userAnswer,setUserAnswer] = useState('')
  const {user} = useUser()
  const [loading, setLoading] = useState(false)

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(()=>{
    results.map((result)=>(
      setUserAnswer(preAns=>preAns+result?.transcript)
    ))
  },[results])

  useEffect(()=>{
    if(!isRecording && userAnswer?.length>10){
      UpdateUserAnswer()
    }
  },[userAnswer])

  const StartStopAnswer= async ()=>{
    if(isRecording){
      stopSpeechToText()
      // if(userAnswer?.length<10){
      //   setLoading(false)
      //   toast('Answer length is less than 10 words, please record again')
      //   return;
      // }
    }
    else{
      setUserAnswer('')
      startSpeechToText()
    }
  }

  const UpdateUserAnswer = async () =>{

    setLoading(true)
    const feedbackPrompt = 'Question: '+interviewQuestions[activeQuestion]?.question+', User answer: '+userAnswer+'. Based on the question and user answer for the given interview question, please provide the rating (should be between 1-10) for the answer and feedback as area of improvement if any in just 3-4 lines to improve it in JSON format with rating field and feedback field.'

      const result = await generateContent(feedbackPrompt)
      const cleanedResp = result.replace(/^```json\s*|\s*```\s*undefined\s*$|\s*```\s*$|\s*undefined\s*$/g, '').replace(/\*+/g, '');

      const MockJsonResp = cleanedResp.trim();
      console.log(MockJsonResp)
      const JsonFeedbackResponse = JSON.parse(MockJsonResp)

      const resp = await db.insert(UserAnswer).values({
        mockIdRef:interviewData.mockId,
        question:interviewQuestions[activeQuestion]?.question,
        correctAns:interviewQuestions[activeQuestion]?.answer,
        userAns:userAnswer,
        feedback:JsonFeedbackResponse?.feedback,
        rating:JsonFeedbackResponse?.rating,
        userEmail:user?.primaryEmailAddress?.emailAddress,
        createdAt:moment().format('DD-MM-yyyy')
      })

      if(resp){
        toast('User Answer recorded successfully')
      }
      setUserAnswer('')
      setLoading(false)

  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='items-center mt-5 p-5 justify-center border-none rounded-lg'>
        {/* <Image src={'/webcam.webp'} height={140} width={140} className='absolute' alt='webcam' /> */}
        <Webcam 
        mirrored={true}
        style={{
          height:300,
          width:'100%',
          zIndex:10,
        }}
        className='rounded-md'
        />
      </div>
      <Button 
      disabled={loading}
      className={`w-[160px] h-[40px] font-semibold text-md my-7 cursor-pointer
      ${isRecording? 'bg-red-700 hover:bg-red-800' :
        'bg-[#273AC7] hover:bg-[#273AC7]/70'
      }
      `}
      onClick={StartStopAnswer}
      >
        {isRecording?( <h2 className='flex gap-2 items-center justify-center animate-pulse' ><StopCircle/>Stop Recording</h2>):(
        <h2 className='flex gap-2 items-center justify-center'><Mic/>Record Answer</h2>)}</Button>

        {/* <Button onClick={()=>console.log(userAnswer)}>Show Answer</Button> */}
    </div>
  )
}

export default RecordAnswerSection