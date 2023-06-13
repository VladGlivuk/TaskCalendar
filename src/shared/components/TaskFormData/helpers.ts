//types
import { Task } from 'core/types';

export const getNewTaskValue = (task: Task, isEditing: boolean): Task =>
  isEditing || !!task.taskId ? task : { ...task, taskId: task.label + task.date?.getSeconds() + task.colors.toString() + new Date().getSeconds() };

export const getIsFormValid = (task: Task): boolean => task.label.trim().length > 2;

export const getNewFilteredTaskValue = (task: Task, deleteValue: string) => ({ ...task, colors: task.colors.filter((color) => color !== deleteValue) });

export const getTaskWithNewColor = (task: Task, newColorValue: string) => ({ ...task, colors: [...task.colors, newColorValue] });

export const getTaskWithNewLabel = (task: Task, newLabelValue: string) => ({ ...task, label: newLabelValue });
