import pool from '../utils/db';

export interface Task {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  userId: number;
}

export const getAllTasks = async (): Promise<Task[]> => {
  const { rows } = await pool.query('SELECT * FROM tasks');
  return rows;
};

export const getTaskById = async (id: number): Promise<Task | null> => {
  const { rows } = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
  return rows[0] || null;
};

export const createTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  const { title, description, isCompleted } = task;
  const { rows } = await pool.query(
    'INSERT INTO tasks (title, description, isCompleted) VALUES ($1, $2, $3) RETURNING *',
    [title, description, isCompleted]
  );
  return rows[0];
};

export const updateTask = async (id: number, task: Partial<Task>): Promise<Task | null> => {
  const { title, description, isCompleted } = task;
  const { rows } = await pool.query(
    'UPDATE tasks SET title = $1, description = $2, isCompleted = $3 WHERE id = $4 RETURNING *',
    [title, description, isCompleted, id]
  );
  return rows[0] || null;
};

export const deleteTask = async (id: number): Promise<void> => {
  await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
};
