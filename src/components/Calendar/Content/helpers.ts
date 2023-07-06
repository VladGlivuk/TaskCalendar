//types
import { CalendarDay, Task } from 'core/types';
//constants
import { maxTasksInDay } from 'core/constants';

export const getCalendarDayById = (calendarData: Array<CalendarDay>, calendarDayId: string): CalendarDay | undefined =>
  calendarData.find((day) => day.id === calendarDayId);

export const getTaskIndexById = (tasks: Array<Task> | undefined, taskId: string): number | undefined => tasks?.findIndex((task) => task.taskId === taskId);

export const getIsValidDragAndDrop = (
  pickedCalendarDay: CalendarDay | undefined,
  pickedTask: Task | undefined,
  previousCalendarDay: CalendarDay | undefined,
  calendarDayId: string
): boolean =>
  !!(pickedCalendarDay && pickedCalendarDay.tasks.length < maxTasksInDay && pickedTask && previousCalendarDay && previousCalendarDay.id !== calendarDayId) &&
  !pickedCalendarDay.holidayInfo;

export const getNewPreviousDay = (previousCalendarDay: CalendarDay, taskId: string) => ({
  ...previousCalendarDay,
  tasks: previousCalendarDay?.tasks.filter((task) => task.taskId !== taskId),
});

export const getNewPickedDay = (pickedCalendarDay: CalendarDay, pickedTask: Task) => ({
  ...pickedCalendarDay,
  tasks: [...pickedCalendarDay.tasks, pickedTask],
});

export const getNewCalendarDayAfterTaskSwipe = (currentCalendarDay: CalendarDay, taskIndex: number, swipeTaskIndex: number) => ({
  ...currentCalendarDay,
  tasks: currentCalendarDay.tasks.map((task, index) =>
    index === taskIndex ? currentCalendarDay.tasks[swipeTaskIndex] : index === swipeTaskIndex ? currentCalendarDay.tasks[taskIndex] : task
  ),
});

export const getIsValidTaskSwipe = (
  currentCalendarDay: CalendarDay | undefined,
  taskIndex: number | undefined,
  swipeTaskIndex: number | undefined,
  targetTaskId: string,
  swapTaskId: string
) =>
  currentCalendarDay && typeof taskIndex === 'number' && typeof swipeTaskIndex === 'number' && targetTaskId !== swapTaskId && !currentCalendarDay.holidayInfo;
