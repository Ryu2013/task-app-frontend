import React, { useState } from 'react';
import type { CreateTaskDto } from '../types';

interface TaskFormProps {
    onSubmit: (task: CreateTaskDto) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        onSubmit({
            title,
            due_date: dueDate || null,
        });
        setTitle('');
        setDueDate('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white shadow rounded-lg">
            <div className="flex flex-col sm:flex-row gap-3">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="New task..."
                    className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!title.trim()}
                >
                    Add
                </button>
            </div>
        </form>
    );
};
