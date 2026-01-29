
'use client';
import { useSyncExternalStore } from 'react';
import { taskStore } from '@/lib/store';
import { Task, Status } from '@/types/task';
import { v4 as uuidv4 } from 'uuid';

export const useTasks = () => {
  
  const tasks = useSyncExternalStore(
    taskStore.subscribe,
    taskStore.getSnapshot,
    taskStore.getServerSnapshot
  );

  const addTask = (title: string, description: string) => {
    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      status: 'todo',
      createdAt: Date.now(),
    };
    taskStore.setTasks([newTask, ...tasks]);
  };

  const updateStatus = (id: string, status: Status) => {
    const updated:Task[] = tasks.map(t => t.id === id ? { ...t, status } : t);
    taskStore.setTasks(updated);
  };

  const deleteTask = (id: string) => {
    const filtered = tasks.filter((t: { id: string; }) => t.id !== id);
    taskStore.setTasks(filtered);
  };

  return { tasks, addTask, updateStatus, deleteTask };
};