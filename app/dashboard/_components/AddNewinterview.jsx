"use client"

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { generateContent } from '@/utils/GeminiAIModel'
import { LoaderCircle } from 'lucide-react'
import { MockInterview } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { db } from '@/utils/db'
import { useRouter } from 'next/navigation'


function AddNewinterview() {

  const [openDialog, setOpenDialog] = useState(false)
  const [JobPos, setJobpos] = useState()
  const [JobDesc, setJobdes] = useState()
  const [JobExp, setJobexp] = useState()
  const [loading, setLoading] = useState(false)
  const [JsonResp, setJsonresp] = useState([])
  const {user} = useUser()
  const router = useRouter()

  const onSubmit = async (e)=>{
    setLoading(true)
    e.preventDefault()
    console.log(JobDesc,JobPos,JobExp)

    const InputPrompt="Job position: "+JobPos+", Job Description: "+JobDesc+", Years of Experience: "+JobExp+". Based on the above given details generate "+process.env.NEXT_PUBLIC_QUESTION_COUNT+" Questions with Answers in JSON format. Give Questions and Answers as field in JSON."

    try {
      const geminiResponse = await generateContent(InputPrompt);

      const cleanedResp = geminiResponse.replace(/^```json\s*|\s*```\s*undefined\s*$|\s*```\s*$|\s*undefined\s*$/g, '');

      const MockJsonResp = cleanedResp.trim();

      console.log(JSON.parse(MockJsonResp));
      setJsonresp(MockJsonResp)

      const resp = await db.insert(MockInterview).values({
        mockId:uuidv4(),
        jsonMockResp:MockJsonResp,
        jobPosition:JobPos,
        jobDesc:JobDesc,
        jobExp:JobExp,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD-MM-yyyy')
      }).returning({mockId:MockInterview.mockId})

      console.log("Inserted ID: ", resp)

      if(resp){
        setOpenDialog(false)
        router('/dashboard/interview/'+resp[0]?.mockId)
      }

    } catch (error) {
      console.error('Error calling Gemini API:', error);
    }
    setLoading(false)
    
  }

  return (
    <div>
      <div className='p-8 rounded-lg  bg-[rgb(16,31,74)] cursor-pointer hover:scale-105 transition-all'
      onClick={()=>setOpenDialog(true)}
      >
        <h2 className='font-semibold text-lg text-center'>+ Add New</h2>
      </div>
      <Dialog open={openDialog}>
        
        <DialogContent className={'border-none bg-[rgb(19,23,49)]'}>
          <DialogHeader>
            <DialogTitle className={'text-xl'}>Tell us more about Job you are interviewing</DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
              <div>
                <h2>Add details about your Job position/role, Job description and years of experience</h2>

                <div className='mt-5 my-3'>
                  <label className='font-semibold text-gray-400'>Add Job Position/ Job Role</label>
                  <Input placeholder='Ex. Full stack developer' className={'text-white mt-2'} required
                  onChange={(event)=>setJobpos(event.target.value)} 
                  />
                </div>

                <div className='my-3'>
                  <label className='font-semibold text-gray-400'>Job Description/ Tech Stack (In short)</label>
                  <Textarea placeholder='Ex. React, NodeJS, etc' className={'text-white mt-2'} required
                  onChange={(event)=>setJobdes(event.target.value)} 
                   />
                </div>

                <div className='my-3'>
                  <label className='font-semibold text-gray-400'>Years of experience</label>
                  <Input placeholder='Ex. 7' type="number" min="0" max="40" className={'text-white mt-2'} required
                  onChange={(event)=>setJobexp(event.target.value)}
                  />
                </div>

              </div>
              <div className='flex gap-3 justify-end mt-5'>
                <Button type="button" className={'cursor-pointer'} onClick={()=>setOpenDialog(false)}>Cancel</Button>
                <Button type="submit" disabled={loading} className={'cursor-pointer'}>
                  {loading?
                  <>
                  <LoaderCircle className='animate-spin' />'Generating from AI'</>:'Start Interview'  
                }
                </Button>
              </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddNewinterview