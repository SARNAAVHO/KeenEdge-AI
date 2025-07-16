"use client";

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { generateContent } from '@/utils/GeminiAIModel';
import { LoaderCircle } from 'lucide-react';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { db } from '@/utils/db';
import { useRouter } from 'next/navigation';

function AddNewinterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [JobPos, setJobpos] = useState();
  const [JobDesc, setJobdes] = useState();
  const [JobExp, setJobexp] = useState();
  const [loading, setLoading] = useState(false);
  const [JsonResp, setJsonresp] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const InputPrompt = `Job position: ${JobPos}, Job Description: ${JobDesc}, Years of Experience: ${JobExp}. Based on the above given details generate ${process.env.NEXT_PUBLIC_QUESTION_COUNT} Questions with Answers in JSON format. Give Questions and Answers as field in JSON.`;

    try {
      const geminiResponse = await generateContent(InputPrompt);
      const cleanedResp = geminiResponse.replace(/^```json\s*|\s*```\s*undefined\s*$|\s*```\s*$|\s*undefined\s*$/g, '');
      const MockJsonResp = cleanedResp.trim();

      setJsonresp(MockJsonResp);

      const resp = await db.insert(MockInterview).values({
        mockId: uuidv4(),
        jsonMockResp: MockJsonResp,
        jobPosition: JobPos,
        jobDesc: JobDesc,
        jobExp: JobExp,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD-MM-yyyy'),
      }).returning({ mockId: MockInterview.mockId });

      if (resp) {
        setOpenDialog(false);
        router(`/dashboard/interview/${resp[0]?.mockId}`);
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
    }

    setLoading(false);
  };

  return (
    <div>
      <div
        className="p-5 rounded-2xl bg-[rgb(16,31,74)] hover:bg-[rgb(18,36,95)] cursor-pointer hover:scale-105 transition-all shadow-md"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-semibold text-base sm:text-lg text-center text-white">+ Add New</h2>
      </div>

      <Dialog open={openDialog}>
        <DialogContent className="border-none bg-[rgb(19,23,49)] text-white w-[90%] sm:max-w-xl max-h-[90vh] overflow-y-auto rounded-xl px-4 py-6">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl mb-2">
              Tell us about your job role
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-400 mb-4">
              Fill in the details to generate a mock interview tailored to your job profile.
            </DialogDescription>

            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label className="block mb-1 font-medium text-gray-300 text-sm">Job Position / Role</label>
                <Input
                  placeholder="Ex. Full Stack Developer"
                  className="text-white placeholder:text-gray-500 bg-[rgb(24,28,62)] text-sm"
                  required
                  onChange={(e) => setJobpos(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-300 text-sm">Job Description / Tech Stack</label>
                <Textarea
                  placeholder="Ex. React, Node.js, MongoDB"
                  className="text-white placeholder:text-gray-500 bg-[rgb(24,28,62)] text-sm"
                  required
                  onChange={(e) => setJobdes(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-300 text-sm">Years of Experience</label>
                <Input
                  type="number"
                  min="0"
                  max="40"
                  placeholder="Ex. 2"
                  className="text-white placeholder:text-gray-500 bg-[rgb(24,28,62)] text-sm"
                  required
                  onChange={(e) => setJobexp(e.target.value)}
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-700 mt-6">
                <Button
                  type="button"
                  variant="ghost"
                  className="cursor-pointer w-full sm:w-auto"
                  onClick={() => setOpenDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="cursor-pointer w-full sm:w-auto"
                >
                  {loading ? (
                    <>
                      <LoaderCircle className="animate-spin mr-2 h-4 w-4" />
                      Generating...
                    </>
                  ) : (
                    "Start Interview"
                  )}
                </Button>
              </div>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewinterview;
