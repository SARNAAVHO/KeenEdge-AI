import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AddNewinterview from './_components/AddNewinterview'

function Dashboard() {
  return (
    <div className='pt-8'>
      <h2 className='font-bold text-2xl'>Dashboard</h2>
      <h2 className='text-gray-400'>Let's get the confidence up</h2>
    
      <div className='grid grid-cols-1 md:grid-cols-3 my-8'>
        <AddNewinterview/>
      </div>

    </div>
    
  )
}

export default Dashboard