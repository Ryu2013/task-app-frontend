import React from 'react';
import type { Task } from '../types';

interface TaskItemProps {
    task: Task;
    onToggle: (id: number, done: boolean) => void;
    onDelete: (id: number) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
    return (
        <div className="flex items-center justify-between p-4 bg-white shadow rounded-lg mb-2 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    checked={task.done}
                    onChange={(e) => onToggle(task.id, e.target.checked)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300 cursor-pointer"
                />
                <div className={`flex flex-col ${task.done ? 'opacity-50 line-through' : ''}`}>
                    <span className="text-gray-800 font-medium">{task.title}</span>
                    {task.due_date && (
                        <span className="text-xs text-gray-500">
                            Due: {new Date(task.due_date).toLocaleDateString()}
                        </span>
                    )}
                </div>
            </div>
            <button
                onClick={() => onDelete(task.id)}
                className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                aria-label="Delete task"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    );
};
