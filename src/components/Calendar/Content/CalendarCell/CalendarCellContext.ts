import { Dispatch, createContext } from 'react';
//types
import { CalendarDay, Task } from 'core/types';

export type CalendarCellContextType = {
  calendarDay: CalendarDay;
  addTaskHandler: (newTask: Task) => void;
  deleteTaskHandler: (taskId: string) => void;
  editTaskHandler: (newTask: Task) => void;
  setIsAddTaskFormOpen: Dispatch<React.SetStateAction<boolean>>;
};

export const CalendarCellContext = createContext({} as CalendarCellContextType);
