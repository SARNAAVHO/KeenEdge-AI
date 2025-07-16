"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDownIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([])
  const router = useRouter()
  const { interviewId } = React.use(params)

  useEffect(() => {
    getFeedback()
  }, [])

  const getFeedback = async () => {
    const result = await db.select().from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, interviewId))
      .orderBy(UserAnswer.id)

    setFeedbackList(result)
  }

  return (
    <div className='py-10 px-6 md:px-12 max-w-5xl mx-auto'>
      {feedbackList?.length == 0 ? (
        <h2 className='mt-4 text-xl font-bold text-gray-500 text-center pt-10'>No interview feedback record found</h2>
      ) : (
        <>
          <div className='text-center mb-8'>
            <h2 className='text-3xl md:text-4xl font-bold text-[#45ABBF]'>Congratulations!</h2>
            <h2 className='font-semibold mt-2 text-md md:text-lg text-gray-200'>Here is your interview feedback</h2>
            <h2 className='mt-4 text-md md:text-xl text-gray-100'>Your overall interview rating: {" "}
              <strong className='text-[#FFC107]'>
                {(
                  feedbackList.reduce((sum, item) => sum + parseFloat(item.rating || 0), 0) /
                  process.env.NEXT_PUBLIC_QUESTION_COUNT
                ).toFixed(1)}
                /10
              </strong>
            </h2>
            <p className='mt-4 text-sm text-gray-400 max-w-xl mx-auto'>
              Below are your interview questions along with your answers, the correct answers, and areas of improvement.
            </p>
          </div>

          <div className='space-y-4'>
            {feedbackList && feedbackList.map((item, index) => (
              <Collapsible key={index} className='rounded-lg border border-none overflow-hidden'>
                <CollapsibleTrigger className='w-full p-4 text-left bg-[#101F4A] hover:bg-[#142965] transition-all flex justify-between items-center font-semibold text-white'>
                  <span>{item.question}</span>
                  <ChevronsUpDownIcon className='w-5 h-5 text-gray-300 cursor-pointer' />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className='flex flex-col gap-3 border-t border-blue-800 bg-[#0f172a] p-4 text-sm text-white'>
                    <p><strong className='text-[#FFD700]'>Rating:</strong> {item.rating}</p>
                    <p><strong className='text-yellow-400'>Your Answer:</strong> {item.userAns}</p>
                    <p><strong className='text-green-400'>Correct Answer:</strong> {item.correctAns}</p>
                    <p><strong className='text-blue-400'>Feedback:</strong> {item.feedback}</p>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </>
      )}

      <div className='text-center mt-8'>
        <Button
          onClick={() => router.replace('/dashboard')}
          className='cursor-pointer px-6 py-5 text-md font-bold rounded-full bg-primary hover:bg-primary/80 text-white shadow-md'>
          Go to Dashboard
        </Button>
      </div>
    </div>
  )
}

export default Feedback
