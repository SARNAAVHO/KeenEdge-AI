"use client"
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import QuestionSection from './_components/QuestionSection'
import RecordAnswerSection from './_components/RecordAnswerSection'

function StartInterview({params}) {

  const [interviewData, setInterviewData] = useState()
  const [interviewQuestions, setInterviewQuestions] = useState()
  const [activeQuestion, setActiveQuestion] = useState(0)

  const { interviewId } = React.use(params)

  useEffect(()=>{
    getInterviewDetails()
  },[])

  const getInterviewDetails = async ()=>{
      const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId,interviewId))

      const jsonMockResp = JSON.parse(result[0].jsonMockResp)
      // console.log(jsonMockResp)
      setInterviewData(result[0])
      setInterviewQuestions(jsonMockResp)
      // console.log(interviewQuestions)
      // console.log(result)
  }
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        {/* Questions */}
        <QuestionSection 
        interviewQuestions={interviewQuestions}
        activeQuestion={activeQuestion}
        />

        {/* Video and Audio */}
        <RecordAnswerSection
        interviewQuestions={interviewQuestions}
        activeQuestion={activeQuestion}
        interviewData={interviewData}
        />

      </div>
    </div>
  )

}

export default StartInterview