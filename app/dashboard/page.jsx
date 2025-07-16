import { UserButton } from '@clerk/nextjs';
import React from 'react';
import AddNewinterview from './_components/AddNewinterview';
import InterviewList from './_components/InterviewList';

function Dashboard() {
  return (
    <div className="pt-8 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Dashboard</h2>
          <p className="text-gray-400 mt-1 text-sm md:text-base">
            Let's get the confidence up
          </p>
        </div>
        
      </div>

      {/* Add New Interview Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <AddNewinterview />
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 my-10" />

      {/* Interview List */}
      <div>
        <InterviewList />
      </div>
    </div>
  );
}

export default Dashboard;
