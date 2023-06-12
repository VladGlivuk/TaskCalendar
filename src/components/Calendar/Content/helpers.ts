//functions
import { getMonthFromNumber } from 'core/functions';
//types
import { CalendarDay, Task } from 'core/types';
//constants
import { maxDaysInMonth } from 'core/constants';

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

export const getNewFilteredTasks = (tasks: Array<Task>, taskId: string): Array<Task> => tasks.filter((task) => task.taskId !== taskId);

export const getNewEditedTasks = (tasks: Array<Task>, newTask: Task): Array<Task> => tasks.map((task) => (task.taskId === newTask.taskId ? newTask : task));
