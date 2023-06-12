import { Dispatch, createContext } from 'react';
//types
import { CalendarDay, Task } from 'core/types';

export type CalendarCellContextType = {
  calendarDay: CalendarDay;
  addTaskHandler: (newTask: Task, dayId: string) => void;
  deleteTaskHandler: (taskId: string, dayId: string) => void;
  editTaskHandler: (newTask: Task, dayId: string) => void;
  setIsAddTaskFormOpen: Dispatch<React.SetStateAction<boolean>>;
  handleDragging: (dragging: boolean) => void;
};

export const CalendarCellContext = createContext({} as CalendarCellContextType);
