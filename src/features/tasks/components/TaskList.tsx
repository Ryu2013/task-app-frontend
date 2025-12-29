import React, { useEffect, useState } from 'react';
import type { Task, CreateTaskDto } from '../types';
import { getTasks, createTask, updateTask, deleteTask } from '../api/tasks';
import { TaskItem } from './TaskItem';
import { TaskForm } from './TaskForm';

export const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTasks = async () => {
        try {
            const data = await getTasks();
            setTasks(data);
        } catch (err) {
            setError('Failed to load tasks');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleCreateTask = async (newTask: CreateTaskDto) => {
        try {
            const created = await createTask(newTask);
            setTasks(prev => [created, ...prev]);
        } catch (err) {
            console.error('Failed to create task', err);
            // Could add toast notification here
        }
    };

    const handleToggleTask = async (id: number, done: boolean) => {
        try {
            // Optimistic update
            setTasks(prev => prev.map(t => t.id === id ? { ...t, done } : t));
            await updateTask(id, { done });
        } catch (err) {
            console.error('Failed to update task', err);
            // Revert on failure
            fetchTasks();
        }
    };

    const handleDeleteTask = async (id: number) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            setTasks(prev => prev.filter(t => t.id !== id));
            await deleteTask(id);
        } catch (err) {
            console.error('Failed to delete task', err);
            fetchTasks();
        }
    };

    if (loading) return <div className="text-center p-4 text-gray-500">Loading tasks...</div>;
    if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Task Management</h1>
            <TaskForm onSubmit={handleCreateTask} />
            <div className="space-y-2">
                {tasks.map(task => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onToggle={handleToggleTask}
                        onDelete={handleDeleteTask}
                    />
                ))}
                {tasks.length === 0 && (
                    <p className="text-center text-gray-500 mt-8">No tasks yet. Add one above!</p>
                )}
            </div>
        </div>
    );
};
