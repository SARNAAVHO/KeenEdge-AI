"use client";

import React from "react";

function Footer() {
  return (
    <footer className="w-full py-6 border-t border-gray-700 bg-[rgb(18,18,41)] text-center text-gray-400 text-sm mt-12">
      <p>
        &copy; {new Date().getFullYear()} KeenEdge-AI. Sarnaavho Pal. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
