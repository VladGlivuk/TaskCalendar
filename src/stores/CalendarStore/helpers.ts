//functions
import { getMonthFromNumber } from 'core/functions';
//types
import { CalendarDay, Holiday, HolidayResponse, Task } from 'core/types';
//constants
import { getAllHolidaysEndpoint, maxDaysInMonth } from 'core/constants';

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

export const holidaysFetch = async (): Promise<Array<Holiday> | undefined> => {
  const allHolidaysResponse = await fetch(getAllHolidaysEndpoint, { method: 'GET' });
  const allHolidaysJson: Array<HolidayResponse> = await allHolidaysResponse.json();

  const newHolidays: Array<Holiday> = allHolidaysJson.map(({ date, localName, countryCode }) => ({
    date,
    localName,
    countryCode,
  }));

  return newHolidays;
};

export const getCalendarCellValue = (date: Date, holidays: Array<Holiday> | undefined): CalendarDay => {
  const year = date.getFullYear();
  const monthDay = date.getDate();
  const monthNumber = date.getMonth();

  const month = getMonthFromNumber(monthNumber);

  let holidayInfo: Holiday | null = null;

  if (holidays) {
    const holidaysDates = holidays?.map((holiday) => {
      const fullDate = new Date(holiday.date);
      const holidayYear = fullDate.getFullYear();
      const holidayMonth = fullDate.getMonth();
      const holidayDay = fullDate.getDate();

      return { compareHolidayDate: new Date(holidayYear, holidayMonth, holidayDay), holidayDate: holiday.date };
    });

    holidayInfo = holidaysDates
      .map(({ compareHolidayDate, holidayDate }) => {
        const newComparedCalendarDate = new Date(year, monthNumber, monthDay);

        const isHoliday = compareHolidayDate.getTime() === newComparedCalendarDate.getTime();

        if (isHoliday) {
          const holiday = holidays?.find((holiday) => holiday.date === holidayDate);
          return holiday ? holiday : null;
        }
        return null;
      })
      .filter((holiday) => !!holiday)[0];
  }

  return {
    date,
    monthDay,
    month,
    tasks: [],
    holidayInfo,
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

export const getNewCalendarAfterTaskSwipe = (calendarData: Array<CalendarDay>, newCurrentCalendarDay: CalendarDay, swapCalendarDayId: string) =>
  calendarData.map((calendarDay) => (calendarDay.id === swapCalendarDayId ? newCurrentCalendarDay : calendarDay));
