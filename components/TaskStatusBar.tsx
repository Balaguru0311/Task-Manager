'use client';
import React from 'react';
import { Filter } from 'lucide-react';
import { Status } from '../types/task';

interface TaskStatusBarProps {
  currentFilter: 'all' | Status;
  setFilter: (filter: 'all' | Status) => void;
}

export const TaskStatusBar = ({ currentFilter, setFilter }: TaskStatusBarProps) => {
  const options = ['all', 'todo', 'in-progress', 'done'] as const;

  return (
    <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
      <Filter size={16} className="text-gray-400 mr-2" />
      {options.map((s) => (
        <button
          key={s}
          onClick={() => setFilter(s)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
            currentFilter === s 
              ? 'bg-gray-800 text-white shadow-md' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {s === 'all' ? 'All Tasks' : s.charAt(0).toUpperCase() + s.slice(1).replace('-', ' ')}
        </button>
      ))}
    </div>
  );
};