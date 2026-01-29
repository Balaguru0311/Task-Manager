'use client';
import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { Status } from '../types/task';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';
import { TaskFooter } from '../components/TaskFooter';
import { TaskStatusBar } from '../components/TaskStatusBar';

export default function TaskManager() {
  const { tasks, addTask, updateStatus, deleteTask } = useTasks();
  const [filter, setFilter] = useState<'all' | Status>('all');

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  return (
    <main className="max-w-4xl mx-auto p-6 min-h-screen bg-white text-black">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Task Manager</h1>
        <p className="text-gray-500 text-sm">Organize your workflow efficiently</p>
      </header>

      <TaskForm tasks={tasks} addTask={addTask} />

      <TaskStatusBar currentFilter={filter} setFilter={setFilter} />

      <TaskList 
        tasks={filteredTasks} 
        updateStatus={updateStatus} 
        deleteTask={deleteTask} 
      />

      <TaskFooter 
        total={tasks.length} 
        filtered={filteredTasks.length} 
      />
    </main>
  );
}