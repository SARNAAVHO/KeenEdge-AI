"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import InterviewCard from './InterviewCard' // <-- Path may vary

function InterviewList() {
  const { user } = useUser()
  const [interviewList, setInterviewList] = useState([])
  const [loading, setLoading] = useState(true)

  const getInterviewList = async () => {
    setLoading(true)
    try {
      const result = await db.select().from(MockInterview)
        .where(eq(MockInterview?.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(MockInterview.id))

      setInterviewList(result)
    } catch (error) {
      console.error("Failed to fetch interviews:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    user && getInterviewList()
  }, [user])

  return (
    <div>
      <h2 className='font-medium text-xl'>Your Previous Mock Interviews</h2>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {loading ? (
          <p className="text-gray-500 mt-4">Loading previous interviews...</p>
        ) : interviewList.length > 0 ? (
          interviewList.map((item, index) => (
            <InterviewCard key={index} item={item} index={index} />
          ))
        ) : (
          <p className="text-gray-500 mt-4">No interviews found.</p>
        )}
      </div>
    </div>
  )
}

export default InterviewList
