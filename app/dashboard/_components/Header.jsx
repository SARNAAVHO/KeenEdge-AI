"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {

  const path = usePathname();

  return (
    <div className='flex px-7 py-6 items-center justify-between bg-[rgb(18,18,41)] shadow-md'>
      <Image className='cursor-pointer' src={'/logo.svg'} width={170} height={100} alt='logo'/>
      <ul className='hidden md:flex gap-8'>
        <li className={`hover:font-bold hover:text-primary transition-all cursor-pointer
          ${path=='/dashboard' && 'text-primary font-bold'} `}>Dashboard</li>
        <li className='hover:font-bold hover:text-primary transition-all cursor-pointer'>Questions</li>
        <li className='hover:font-bold hover:text-primary transition-all cursor-pointer'>Upgrade</li>
        <li className='hover:font-bold hover:text-primary transition-all cursor-pointer'>How it works?</li>
      </ul>
      <UserButton/>
    </div>
  )
}

export default Header