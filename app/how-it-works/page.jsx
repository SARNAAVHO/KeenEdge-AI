import React from 'react';
import { Lightbulb, Mic, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    icon: <Lightbulb className="w-8 h-8 text-cyan-400" />,
    title: 'Choose Your Role & Domain',
    description: 'Pick from a variety of job roles and tech stacks to get tailored mock interview questions.'
  },
  {
    icon: <Mic className="w-8 h-8 text-cyan-400" />,
    title: 'Start the AI-Powered Interview',
    description: 'Interact with our smart AI interviewer that mimics real-time HR and technical rounds.'
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-cyan-400" />,
    title: 'Get Instant Feedback',
    description: 'Receive detailed insights, confidence scores, and suggestions to improve your performance.'
  }
];

function HowItWorks() {
  return (
    <section className="min-h-screen bg-transparent py-16 px-6 md:px-12 text-white">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
          How It Works
        </h2>
        <p className="text-md text-gray-300 mb-12">
          Prepare for your dream job with AI-driven mock interviews in 3 simple steps.
        </p>

        <div className="grid md:grid-cols-3 gap-10 text-left">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-black/30 p-6 rounded-2xl border border-gray-700 shadow hover:shadow-lg transition duration-300"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <Link
            href="/dashboard"
            className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white text-lg font-medium py-3 px-6 rounded-full transition"
          >
            Start Your Interview
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
