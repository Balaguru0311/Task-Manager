'use client';
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Task } from '../types/task';

interface TaskFormProps {
  tasks: Task[];
  addTask: (title: string, description: string) => void;
}

export const TaskForm = ({ tasks, addTask }: TaskFormProps) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedTitle = title.trim();

    if (trimmedTitle.length < 3) {
      alert("Task must be at least 3 characters long.");
      return;
    }

    const validPattern = /^(?=.*[a-zA-Z])[a-zA-Z0-9\s]+$/;

    if (!validPattern.test(trimmedTitle)) {
      alert("Task must contain letters and no special characters.");
      return;
    }

    const normalizedNewTask = trimmedTitle.toLowerCase().replace(/\s+/g, '');
    const isDuplicate = tasks.some((task) => {
      const normalizedExisting = task.title.toLowerCase().replace(/\s+/g, '');
      return normalizedExisting === normalizedNewTask;
    });

    if (isDuplicate) {
      alert("You already have a similar task");
      return;
    }

    addTask(trimmedTitle, '');
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task name"
        className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black bg-white shadow-sm"
      />
      <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition font-medium">
        <Plus size={20} /> Add Task
      </button>
    </form>
  );
};