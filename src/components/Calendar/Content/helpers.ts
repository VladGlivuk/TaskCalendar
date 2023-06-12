//functions
import { getMonthFromNumber } from 'core/functions';
//types
import { CalendarDay, Task } from 'core/types';
//constants
import { maxDaysInMonth, maxTasksInDay } from 'core/constants';

export const getDaysInCurrentMonth = (month: number): Array<Date> => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const currentMonthDays = getCurrentMonthDays();

  const firstWeekDay = currentMonthDays[0].getDay();
  const isSundayFirstDay = firstWeekDay === 0;

  const previousMonthDays: Array<Date> = [];

  if (!isSundayFirstDay) {
    const addArr = new Array(firstWeekDay)
      .fill('')
      .map((_date, i) => new Date(currentYear, month - 1, 0 - i))
      .reverse();

    previousMonthDays.push(...addArr);
  }

  const nextMonthsDays: Array<Date> = [];

  const lastDay = currentMonthDays[currentMonthDays.length - 1].getDay();
  const isSaturdayLastDay = lastDay === 6;

  if (!isSaturdayLastDay) {
    const addArr = new Array(6 - lastDay).fill('').map((_date, i) => new Date(currentYear, month, i + 1));
    nextMonthsDays.push(...addArr);
  }

  const result = [...previousMonthDays, ...currentMonthDays, ...nextMonthsDays];
  return result;

  function getCurrentMonthDays() {
    return new Array(maxDaysInMonth)
      .fill('')
      .map((_date, i) => new Date(currentYear, month - 1, i + 1))
      .filter((date) => date.getMonth() === month - 1);
  }
};

export const getCalendarCellValue = (date: Date): CalendarDay => {
  const monthDay = date.getDate();
  const monthNumber = date.getMonth();

  const month = getMonthFromNumber(monthNumber);

  return {
    date,
    monthDay,
    month,
    tasks: [],
    id: date.getDay() * monthDay + date.getDate().toString() + month,
  };
};

export const getCalendarWithNewTask = (calendar: Array<CalendarDay>, dayId: string, newTask: Task) =>
  calendar.map((calendarDay) => (calendarDay.id === dayId ? { ...calendarDay, tasks: [...calendarDay.tasks, newTask] } : calendarDay));

export const getCalendarWithoutDeletedTask = (calendar: Array<CalendarDay>, dayId: string, taskId: string) =>
  calendar.map((calendarDay) => {
    return calendarDay.id === dayId ? { ...calendarDay, tasks: getNewFilteredTasks(calendarDay.tasks, taskId) } : calendarDay;

    function getNewFilteredTasks(tasks: Array<Task>, taskId: string): Array<Task> {
      return tasks.filter((task) => task.taskId !== taskId);
    }
  });

export const getCalendarWithEditedTask = (calendar: Array<CalendarDay>, dayId: string, editedTask: Task) =>
  calendar.map((calendarDay) => {
    return calendarDay.id === dayId ? { ...calendarDay, tasks: getNewEditedTasks(calendarDay.tasks, editedTask) } : calendarDay;

    function getNewEditedTasks(tasks: Array<Task>, newTask: Task): Array<Task> {
      return tasks.map((task) => (task.taskId === newTask.taskId ? newTask : task));
    }
  });

export const getCalendarDayById = (calendarData: Array<CalendarDay>, calendarDayId: string): CalendarDay | undefined =>
  calendarData.find((day) => day.id === calendarDayId);

export const getTaskIndexById = (tasks: Array<Task> | undefined, taskId: string): number | undefined => tasks?.findIndex((task) => task.taskId === taskId);

export const getIsValidDragAndDrop = (
  pickedCalendarDay: CalendarDay | undefined,
  pickedTask: Task | undefined,
  previousCalendarDay: CalendarDay | undefined,
  calendarDayId: string
): boolean =>
  !!(pickedCalendarDay && pickedCalendarDay.tasks.length < maxTasksInDay && pickedTask && previousCalendarDay && previousCalendarDay.id !== calendarDayId);

export const getNewCalendarAfterDragAndDrop = (
  calendarData: Array<CalendarDay>,
  pickedCalendarDay: CalendarDay,
  newPickedDay: CalendarDay,
  previousCalendarDay: CalendarDay,
  newPreviousDay: CalendarDay
) =>
  calendarData.map((calendarDay) =>
    calendarDay.id === pickedCalendarDay.id ? newPickedDay : calendarDay.id === previousCalendarDay?.id ? newPreviousDay : calendarDay
  );

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

export const getNewCalendarAfterTaskSwipe = (calendarData: Array<CalendarDay>, newCurrentCalendarDay: CalendarDay, swapCalendarDayId: string) =>
  calendarData.map((calendarDay) => (calendarDay.id === swapCalendarDayId ? newCurrentCalendarDay : calendarDay));

export const getIsValidTaskSwipe = (currentCalendarDay: CalendarDay | undefined, taskIndex: number | undefined, swipeTaskIndex: number | undefined, targetTaskId: string, swapTaskId: string) =>
  currentCalendarDay && typeof taskIndex === 'number' && typeof swipeTaskIndex === 'number' && targetTaskId !== swapTaskId;
