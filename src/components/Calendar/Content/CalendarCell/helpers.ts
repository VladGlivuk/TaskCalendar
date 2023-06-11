//types
import { Task } from 'core/types';

export const getNewFilteredTasks = (tasks: Array<Task>, taskId: string): Array<Task> => tasks.filter((task) => task.id !== taskId);

export const getNewEditedTasks = (tasks: Array<Task>, newTask: Task): Array<Task> => tasks.map((task) => (task.id === newTask.id ? newTask : task));

export const getCardsAmountInfo = (allTasksLength: number): string => `${allTasksLength} ${allTasksLength === 1 ? 'card' : 'cards'}`;
