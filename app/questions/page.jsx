'use client';

import React, { useState } from 'react';
import { BookOpen, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const allQuestions = [
  {
    id: 1,
    title: 'What is the difference between TCP and UDP?',
    category: 'Networking',
    difficulty: 'Easy',
  },
  {
    id: 2,
    title: 'Explain the working of a hash table.',
    category: 'Data Structures',
    difficulty: 'Easy',
  },
  {
    id: 3,
    title: 'How does garbage collection work in Java?',
    category: 'Programming Languages',
    difficulty: 'Intermediate',
  },
  {
    id: 4,
    title: 'What is normalization in databases?',
    category: 'Databases',
    difficulty: 'Easy',
  },
  {
    id: 5,
    title: 'Explain the differences between process and thread.',
    category: 'Operating Systems',
    difficulty: 'Easy',
  },
  {
    id: 6,
    title: 'What is the purpose of a mutex?',
    category: 'Operating Systems',
    difficulty: 'Intermediate',
  },
  {
    id: 7,
    title: 'Explain the CAP theorem with real-world examples.',
    category: 'Databases',
    difficulty: 'Hard',
  },
  {
    id: 8,
    title: 'How does DNS resolution work?',
    category: 'Networking',
    difficulty: 'Intermediate',
  },
  {
    id: 9,
    title: 'Design a URL shortening service like bit.ly',
    category: 'System Design',
    difficulty: 'Hard',
  },
  {
    id: 10,
    title: 'What are the SOLID principles in OOP?',
    category: 'Software Engineering',
    difficulty: 'Intermediate',
  },
  {
    id: 11,
    title: 'Difference between BFS and DFS traversal.',
    category: 'Algorithms',
    difficulty: 'Easy',
  },
  {
    id: 12,
    title: 'Explain how dynamic programming works with an example.',
    category: 'Algorithms',
    difficulty: 'Hard',
  },
];

const categories = [...new Set(allQuestions.map((q) => q.category))];
const difficulties = ['Easy', 'Intermediate', 'Hard'];

export default function Questions() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  const filteredQuestions = allQuestions.filter((q) => {
    return (
      (!selectedCategory || q.category === selectedCategory) &&
      (!selectedDifficulty || q.difficulty === selectedDifficulty)
    );
  });

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedDifficulty('');
  };

  return (
    <div className="min-h-screen py-14 px-4 md:px-10 bg-transparent text-white">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Interview Practice Questions</h1>
        <p className="text-gray-400 text-sm max-w-xl mx-auto">
          Filter by category and difficulty to sharpen your technical knowledge for interviews.
        </p>
      </div>

      {/* Filter Section */}
      <div className="flex flex-wrap gap-4 items-center justify-center mb-10">
        <div className="flex items-center gap-2 text-gray-400 text-sm cursor-pointer select-none">
          <Filter className="w-4 h-4" />
          <span>Filter by:</span>
        </div>

        <Select onValueChange={setSelectedCategory} value={selectedCategory}>
          <SelectTrigger className="w-[180px] bg-[rgb(19,23,49)] border border-gray-700 text-white cursor-pointer">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="bg-[rgb(19,23,49)] text-white border-gray-700">
            {categories.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={setSelectedDifficulty} value={selectedDifficulty}>
          <SelectTrigger className="w-[160px] bg-[rgb(19,23,49)] border border-gray-700 text-white cursor-pointer">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent className="bg-[rgb(19,23,49)] text-white border-gray-700">
            {difficulties.map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {(selectedCategory || selectedDifficulty) && (
          <Button
            variant="outline"
            size="sm"
            className="text-xs border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black transition cursor-pointer"
            onClick={clearFilters}
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Questions Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredQuestions.map((q) => (
          <div
            key={q.id}
            className="bg-[rgb(19,23,49)] border border-[rgba(255,255,255,0.08)] rounded-xl p-5 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
          >
            <h2 className="text-base font-semibold text-white mb-2 flex items-start gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-1" />
              <span>{q.title}</span>
            </h2>
            <div className="flex gap-2 mt-3 flex-wrap">
              <Badge variant="outline" className="text-xs text-white border-gray-600 bg-[rgb(28,32,65)]">
                {q.category}
              </Badge>
              <Badge className="text-xs bg-[#45ABBF] text-black">
                {q.difficulty}
              </Badge>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredQuestions.length === 0 && (
        <p className="text-gray-400 text-center mt-16">
          No questions match your current filters.
        </p>
      )}
    </div>
  );
}
