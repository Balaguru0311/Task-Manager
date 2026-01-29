'use client';
import React from 'react';
import { Trash2 } from 'lucide-react';
import { Task, Status } from '../types/task';

interface TaskListProps {
  tasks: Task[];
  updateStatus: (id: string, status: Status) => void;
  deleteTask: (id: string) => void;
}

const statusStyles: Record<Status, string> = {
  'todo': 'bg-yellow-50 border-yellow-200',
  'in-progress': 'bg-blue-50 border-blue-200',
  'done': 'bg-green-50 border-green-200',
};

export const TaskList = ({ tasks, updateStatus, deleteTask }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-xl">
        <p className="text-gray-400">No tasks found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div 
          key={task.id} 
          className={`flex items-center justify-between p-4 border rounded-xl shadow-sm transition-all duration-200 ${statusStyles[task.status]}`}
        >
          <div className="flex flex-col">
            <span className={`text-lg font-semibold ${task.status === 'done' ? 'line-through text-gray-400' : 'text-gray-800'}`}>
              {task.title}
            </span>
            <span className="text-xs text-gray-500 mt-1">
              Added: {new Date(task.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={task.status}
              onChange={(e) => updateStatus(task.id, e.target.value as Status)}
              className="text-sm border rounded-lg p-2 bg-white text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-sm"
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            
            <button 
              onClick={() => deleteTask(task.id)}
              className="text-red-500 hover:bg-red-100 p-2.5 rounded-lg transition-colors"
              aria-label="Delete task"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};