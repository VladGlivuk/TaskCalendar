//constants
import { months, weekdays } from 'core/constants';

export const getCurrentWeekDay = (): string => {
  const date = new Date();
  const dayIndex = date.getDay();
  const day = weekdays[dayIndex];

  return day;
};

export const getMonthFromNumber = (month: number): string => months[month];

export const getIsDayFirstOrLastInMonth = (day: number, month: number, currentYear: number): boolean => {
  const allMonthDays = new Array(31)
    .fill('')
    .map((_date, i) => new Date(currentYear, month - 1, i + 1))
    .filter((date) => date.getMonth() === month - 1);

  const [firstDate] = allMonthDays;
  const lastDate = allMonthDays[allMonthDays.length - 1];

  return day === firstDate.getDate() || day === lastDate.getDate();
};
