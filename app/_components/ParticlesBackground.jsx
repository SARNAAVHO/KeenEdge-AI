"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div className="absolute inset-0 z-0 w-full h-full">
      {/* Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: {
            color: { value: "transparent" },
          },
          particles: {
            number: {
              value: 80,
              density: { enable: true, value_area: "full" },
            },
            color: { value: "#45ABBF" },
            shape: { type: "circle" },
            opacity: {
              value: 0.7,
              random: true,
            },
            size: {
              value: 3,
              random: true,
            },
            move: {
              enable: true,
              speed: 0.5,
              direction: "none",
              outModes: { default: "out" },
              straight: false,
            },
          },
          interactivity: {
            detectsOn: "canvas",
            events: {
              onHover: { enable: false },
              onClick: { enable: false },
              resize: true,
            },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 w-full h-full"
      />

      {/* Grain Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10" />
    </div>
  );
}

