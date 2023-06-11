//types
import { Task } from 'core/types';

export const getNewTaskValue = (task: Task, isEditing: boolean): Task => (isEditing ? task : { ...task, id: task.label + new Date().getMilliseconds() });

export const getIsFormValid = (task: Task): boolean => task.label.length > 2 && !!task.id;
