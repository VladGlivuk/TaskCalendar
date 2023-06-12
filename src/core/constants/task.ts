//types
import { Task } from 'core/types';

export const maxTasksInDay = 3;

export const defaultTaskValue: Task = {
  date: null,
  label: 'New task',
  colors: ['blue', 'yellow'],
  taskId: '',
  dayId: '',
};
