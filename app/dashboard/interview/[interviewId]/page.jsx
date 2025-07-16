"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterview, UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import { useRouter } from 'next/navigation'

function Interview({params}) {

  const [interviewData, setInterviewData] = useState()
  const [webCamEnabled,setwebCamEnabled] = useState(false)

  const { interviewId } = React.use(params) // unwrapping the promise as using react 19+ or nextjs 14.2+
  useEffect(()=>{
    console.log(interviewId)
    getInterviewDetails()
  },[])

  const getInterviewDetails = async ()=>{
    const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId,interviewId))

    setInterviewData(result[0])
  }

  const router = useRouter();
  const handleStartInterview = async () => {
    try {
      await db.delete(UserAnswer).where(eq(UserAnswer.mockIdRef, interviewId))
      router.push(`/dashboard/interview/${interviewId}/start`)
    } catch (err) {
      console.error("Failed to delete previous feedback: ", err)
    }
  }


  return (
    <div className='my-8 flex justify-center flex-col items-center'>
      <h2 className='font-bold text-2xl'>Let's Get Started</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 my-5'>

        <div className='flex flex-col'>
          <div className='rounded-xl border p-5 my-5'>
            <h2 className='text-md'><strong>Job Role/Position: </strong>{interviewData?.jobPosition ?? 'Loading...'}</h2>
            <h2 className='text-md'><strong>Job Description/Tech Stack: </strong>{interviewData?.jobDesc ?? 'Loading...'}</h2>
            <h2 className='text-md'><strong>Years of Experience: </strong>{interviewData?.jobExp ?? 'Loading...'}</h2>
          </div>
          <div className='p-5 border-2 rounded-lg border-[rgb(21,40,60)] bg-[rgb(22,55,90)]'>
            <h2 className='flex gap-2 items-center text-[#09758b]'><Lightbulb/><strong>Information</strong></h2>
            <h2 className='mt-2 text-[#45ABBF]'>Enable Video Web Cam and Microphone to Start your Al Generated Mock Interview, It Has 7 question which you can answer and at the last you will get the report on the basis of your answer. It's recommended to take the interview from desktop or laptop for better experience.<br/> <strong>NOTE:</strong> We never record your video, Web cam access you can disable at any time if you want.</h2>
          </div>
        </div>

        <div>
        {webCamEnabled ? (
  <div className="flex justify-center items-center my-5">
    <Webcam
      onUserMedia={() => setwebCamEnabled(true)}
      onUserMediaError={() => setwebCamEnabled(false)}
      mirrored={true}
      className="rounded-lg border border-gray-700"
      style={{
        width: 400,
        height: 340,
        objectFit: 'cover',
      }}
    />
  </div>
) : (
  <>
    <WebcamIcon className="w-full h-72 my-5 p-20 bg-[rgb(33,37,75)] rounded-lg border-none" />
    <div className="flex justify-center items-center mt-3">
      <Button className="p-4 w-full cursor-pointer" onClick={() => setwebCamEnabled(true)}>
        Enable Webcam and Microphone
      </Button>
    </div>
  </>
)}

        <div className='mt-2 flex justify-center items-center'>
          {/* <Link href={'/dashboard/interview/'+interviewId+'/start'}> */}
            <Button className={'cursor-pointer'} onClick={handleStartInterview}>Start Interview</Button>  
          {/* </Link> */}
        </div>
        
        </div>
      
    </div>
    </div>
  )
}

export default Interview