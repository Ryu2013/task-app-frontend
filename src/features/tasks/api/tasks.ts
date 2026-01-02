import type { Task, CreateTaskDto, UpdateTaskDto } from '../types';

// 環境変数 (例: http://12.34.56.78:3000)
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// ここで /api を挟む必要があります
const API_URL = `${BASE_URL}/api/tasks`; 

// 結果: http://12.34.56.78:3000/api/tasks となる

export const getTasks = async (): Promise<Task[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch tasks');
    }
    return response.json();
};

export const createTask = async (task: CreateTaskDto): Promise<Task> => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });
    if (!response.ok) {
        throw new Error('Failed to create task');
    }
    return response.json();
};

export const updateTask = async (id: number, task: UpdateTaskDto): Promise<Task> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });
    if (!response.ok) {
        throw new Error('Failed to update task');
    }
    return response.json();
};

export const deleteTask = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete task');
    }
};
