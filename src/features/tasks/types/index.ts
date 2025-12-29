export interface Task {
  id: number;
  title: string;
  due_date: string | null;
  done: boolean;
  created_at: string;
  updated_at: string;
}

export type CreateTaskDto = Pick<Task, 'title' | 'due_date'>;
export type UpdateTaskDto = Partial<Pick<Task, 'title' | 'due_date' | 'done'>>;
