//types
import { CalendarData, CalendarDay, Task } from '.';

export interface ICalendarStore {
  currentDay: number;
  calendarData: CalendarData;
  isFetching: boolean;
  error: string | null;

  fetchCalendarData: () => void;
  addTaskHandler: (dayId: string, newTask: Task) => void;
  editTaskHandler: (dayId: string, editedTask: Task) => void;
  deleteTaskHandler: (dayId: string, taskId: string) => void;
  dragAndDropHandler: (pickedCalendarDay: CalendarDay, newPickedDay: CalendarDay, previousCalendarDay: CalendarDay, newPreviousDay: CalendarDay) => void;
  dragAndDropHandlerInDay: (newCurrentCalendarDay: CalendarDay, swapCalendarDayId: string) => void;
}
