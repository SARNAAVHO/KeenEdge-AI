"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import ParticlesBackground from "./_components/ParticlesBackground";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full text-white overflow-hidden">
      {/* Particle Background */}
      <ParticlesBackground />

      {/* Content above particles */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-24 sm:py-28 md:py-30">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-4xl">
          Ace Your Next Interview <br className="hidden md:inline" /> with{" "}
          <span className="text-[#45ABBF]">KeenEdge AI</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl max-w-xl text-gray-300">
          Personalized mock interviews powered by AI. <br />
          Practice. Improve. Get hired.
        </p>

        <div className="mt-8 flex gap-8">
          <Link href="/dashboard">
            <Button className="bg-[#45ABBF] hover:bg-[#93efff] hover:-translate-y-1.5 text-black font-semibold px-6 py-6 text-md rounded-full shadow-md cursor-pointer">
              Get Started
            </Button>
          </Link>
          <Link href="/how-it-works">
            <Button
              variant="outline"
              className="border-white text-white font-semibold px-6 py-6 text-md rounded-full cursor-pointer hover:-translate-y-1.5"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
