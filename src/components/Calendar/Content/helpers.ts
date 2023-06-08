//functions
import { getMonthFromNumber } from 'core/functions';
//types
import { CalendarDay } from 'core/types';

export const getDaysInCurrentMonth = (month: number) => {
  const maxDaysInMonth = 31;
  const currentDate = new Date();
  const currentDay = currentDate.getDay();

  const isSundayFirstDay = currentDay === 0;
  const currentYear = currentDate.getFullYear();

  const previousMonthDays: Array<Date> = [];

  if (!isSundayFirstDay) {
    const addArr = new Array(currentDay - 1)
      .fill('')
      .map((_date, i) => new Date(currentYear, month - 1, 0 - i))
      .reverse();

    previousMonthDays.push(...addArr);
  }

  const currentMonthDays = new Array(maxDaysInMonth)
    .fill('')
    .map((_date, i) => new Date(currentYear, month - 1, i + 1))
    .filter((date) => date.getMonth() === month - 1);

  const nextMonthsDays: Array<Date> = [];

  const lastDay = currentMonthDays[currentMonthDays.length - 1].getDay();
  const isSaturdayLastDay = lastDay === 6;

  if (!isSaturdayLastDay) {
    const addArr = new Array(6 - lastDay).fill('').map((_date, i) => new Date(currentYear, month, i + 1));
    nextMonthsDays.push(...addArr);
  }

  const result = [...previousMonthDays, ...currentMonthDays, ...nextMonthsDays];
  return result;
};

export const getCalendarCellValue = (day: Date): CalendarDay => {
  const monthDay = day.getDate();
  const monthNumber = day.getMonth();

  const month = getMonthFromNumber(monthNumber);

  return {
    monthDay,
    month,
  };
};
