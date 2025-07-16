import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

function QuestionSection({interviewQuestions, activeQuestion, timeLeft}) {

  const textToSpeech=(text)=>{
    if('speechSynthesis' in window){
      const speech = new SpeechSynthesisUtterance(text)
      window.speechSynthesis.speak(speech)
    } else {
      alert("Your browser doesn't support text to speech")
    }
  }

  return interviewQuestions && (
    <div className='p-5 border-none my-5 rounded-xl bg-[rgb(19,23,49)]'>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-5'>
        {interviewQuestions.map((_, index) => (
          <h2 key={index} className={`p-2 border-none rounded-full bg-[rgb(36,43,87)] text-center text-xs md:text-sm cursor-pointer hover:scale-110 transition-all ${activeQuestion === index ? 'bg-primary font-bold scale-110' : ''}`}>
            Question {index + 1}
          </h2>
        ))}
      </div>

      <div>
        <h2 className='p-2 mt-3 text-md md:text-lg'>{interviewQuestions[activeQuestion]?.question}</h2>
        <Volume2 className='cursor-pointer ml-2 inline' onClick={() => textToSpeech(interviewQuestions[activeQuestion]?.question)} />
      </div>

      <h2 className="inline-block px-3 py-2 ml-2 mt-5 text-sm font-bold text-red-400 border-2 rounded-full border-red-400">Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}</h2>

      <div className='flex-grow'>
        <div className='border-none rounded-lg p-5 bg-[rgb(22,55,90)] mt-10'>
          <h2 className='flex gap-2 items-center text-[#09758b]'>
            <Lightbulb /> <strong className='text-sm'>NOTE:</strong>
          </h2>
          <h2 className='mt-2 ml-1 text-sm text-[#45ABBF]'>Click on Record Answer when you want to answer the question. At the end of interview we will give you the feedback along with correct answer for each of question and your answer to compare it.</h2>
        </div>
      </div>
    </div>
  )
}

export default QuestionSection;
