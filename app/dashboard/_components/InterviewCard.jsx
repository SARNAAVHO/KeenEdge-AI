"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

function InterviewCard({ item, index }) {

  const router = useRouter()

  const onStart=()=>{
    router.push('/dashboard/interview/'+item?.mockId)
  }

  const onFeedback=()=>{
    router.push('/dashboard/interview/'+item?.mockId+'/feedback')
  }

  return (
    <div
    key={index}
    className="mt-8 rounded-2xl bg-[#101F4A] py-4 px-5 w-full max-w-sm mx-auto">
      <h2 className='text-xl font-bold text-[#45ABBF]'>{item?.jobPosition}</h2>
      <h2 className='text-sm'>{item?.jobExp} Years of Experience</h2>
      <h2 className='text-xs text-gray-500 mt-1'>
        Created At: {item?.createdAt}
      </h2>
      <div className='flex justify-between mt-4 gap-6'>
        <Button 
        onClick={onFeedback}
        size='sm' className='cursor-pointer flex-1 bg-primary hover:bg-primary/70 rounded-full'>Feedback</Button>
        <Button 
        onClick={onStart}
        size='sm' className='cursor-pointer flex-1 bg-primary hover:bg-primary/70 rounded-full'>Start</Button>
      </div>
    </div>
  )
}

export default InterviewCard
