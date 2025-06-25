import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

function QuestionSection({interviewQuestions,activeQuestion}) {

  const textToSpeech=(text)=>{
    if('speechSynthesis' in window){
      const speech = new SpeechSynthesisUtterance(text)
      window.speechSynthesis.speak(speech)
    }
    else{
      alert("Your browser doesn't support text to speech")
    }
  }

  return interviewQuestions&&(
    <div className='p-5 border-none my-5 rounded-xl bg-[rgb(19,23,49)]'>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-5'>
        {interviewQuestions&&interviewQuestions.map((question, index)=>(
          <h2 className={`p-2 border-none rounded-full bg-[rgb(36,43,87)] text-center text-xs md:text-sm cursor-pointer hover:scale-110 transition-all
            ${activeQuestion==index&&'bg-primary font-bold scale-110'}`} key={index}>Question {index+1}</h2>
        ))}
      </div>
      <h2 className='p-2 mt-3 text-md md:text-lg'>{interviewQuestions[activeQuestion]?.question}</h2>

      <Volume2 className='cursor-pointer ml-2' onClick={()=>textToSpeech(interviewQuestions[activeQuestion]?.question)}/>

      <div className='border-none rounded-lg p-5 bg-[rgb(22,55,90)] mt-32'>
        <h2 className='flex gap-2 items-center text-[#09758b]'>
          <Lightbulb/> <strong className='text-sm'>NOTE:</strong>
        </h2>
        <h2 className='mt-2 ml-1 text-sm text-[#45ABBF]'>Click on Record Answer when you want to answer the question. At the end of interview we will give you the feedback along with correct answer for each of question and your answer to comapre it.</h2>
      </div>

    </div>
  )
}

export default QuestionSection