import { Dispatch, SetStateAction, createContext } from 'react';
//types
import { CalendarDay, Task } from 'core/types';

export type CalendarCellContextType = {
  calendarDay: CalendarDay;
  isDragging: boolean;
  addTaskHandler: (newTask: Task, dayId: string) => void;
  deleteTaskHandler: (taskId: string, dayId: string) => void;
  editTaskHandler: (newTask: Task, dayId: string) => void;
  setIsAddTaskFormOpen: Dispatch<SetStateAction<boolean>>;
  handleDragging: (dragging: boolean) => void;
  handleDragAndDropUpdate: (taskId: string, calendarDayId: string) => void;
  handleSwipeTasksUpdate: (taskId: string, swapTaskId: string, calendarDayId: string) => void;
};

export const CalendarCellContext = createContext({} as CalendarCellContextType);
