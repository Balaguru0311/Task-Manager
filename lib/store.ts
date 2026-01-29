
import { Task } from '@/types/task';

const EMPTY_TASKS: Task[] = [];
let cachedTasks: Task[] = EMPTY_TASKS;
let lastRawData: string | null = null;

const listeners = new Set<() => void>();

export const taskStore = {
  getSnapshot() {
    if (typeof window === 'undefined') return EMPTY_TASKS;
    
    const rawData = localStorage.getItem('tasks-data');
    
    // Only re-parse if the string in localStorage actually changed
    if (rawData !== lastRawData) {
      lastRawData = rawData;
      cachedTasks = rawData ? JSON.parse(rawData) : EMPTY_TASKS;
    }
    
    return cachedTasks;
  },

  subscribe(callback: () => void) {
    listeners.add(callback);
    return () => listeners.delete(callback);
  },

  getServerSnapshot() {
    return EMPTY_TASKS;
  },

  setTasks(tasks: Task[]) {
    const stringified = JSON.stringify(tasks);
    localStorage.setItem('tasks-data', stringified);
    lastRawData = stringified;
    cachedTasks = tasks;
    listeners.forEach((l) => l());
  }
};