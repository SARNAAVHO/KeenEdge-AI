'use client';

import { UserButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Questions', href: '/questions' },
  { name: 'Upgrade', href: '/upgrade' },
  { name: 'How it works?', href: '/how-it-works' },
];

function Header() {
  const path = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isSignedIn } = useUser();

  return (
    <header className="shadow-md w-full relative z-50">
      <div className="flex px-8 py-6 items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/">
          <Image
            className="cursor-pointer"
            src="/logo.svg"
            width={170}
            height={100}
            alt="logo"
          />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-8 text-white">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`transition-all cursor-pointer hover:scale-110 hover:font-bold hover:text-primary ${
                  path === item.href ? 'text-primary font-bold scale-110' : ''
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side: Sign In / Avatar + Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          {!isSignedIn && (
            <div className="hidden md:block">
              <Link href="/sign-in"
                className="border-none text-black font-bold bg-[#45ABBF] hover:bg-[#39a2b4a4] px-4 py-2 text-sm rounded-full cursor-pointer">
                  SIGN IN
                
              </Link>
            </div>
          )}

          {isSignedIn && (
            <div className="hidden md:block">
              <UserButton />
            </div>
          )}

          {/* Mobile toggle button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-white focus:outline-none">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-transparent border-t border-gray-700 px-6 pb-4 space-y-4 pt-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block text-white transition hover:text-[#0084FF] ${
                path === item.href ? 'text-[#0084FF] font-bold' : ''
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          {!isSignedIn && (
            <Link
              href="/sign-in"
              className="block text-center text-black font-semibold bg-[#45ABBF] hover:bg-[#39a2b485] px-4 py-2 rounded-md"
              onClick={() => setMenuOpen(false)}
            >
              Sign In
            </Link>
          )}

          {isSignedIn && (
            <div className="pt-3">
              <UserButton />
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
