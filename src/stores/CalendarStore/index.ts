import { configure, observable, runInAction } from 'mobx';
//types
import { CalendarData, CalendarDay, ICalendarStore, Task } from 'core/types';
//constants
import { calendar, initialCalendarData } from 'core/constants';
//helpers
import {
  getCalendarCellValue,
  getCalendarWithEditedTask,
  getCalendarWithNewTask,
  getCalendarWithoutDeletedTask,
  getDaysInCurrentMonth,
  getNewCalendarAfterDragAndDrop,
  getNewCalendarAfterTaskSwipe,
  holidaysFetch,
} from './helpers';

// strict mode
configure({ enforceActions: 'always' });

const calendarObservable: ICalendarStore = {
  currentDay: new Date().getDate(),
  calendarData: initialCalendarData,
  isFetching: false,
  error: null,

  fetchCalendarData() {
    try {
      holidaysFetch().then((holidays) => {
        const currentCalendarData = localStorage.getItem(calendar);

        if (currentCalendarData) {
          const parsedCalendarData: CalendarData = JSON.parse(currentCalendarData);

          runInAction(() => (this.calendarData = parsedCalendarData));
        } else {
          const currentDate = new Date();
          const currentMonth = currentDate.getMonth() + 1;
          const days = getDaysInCurrentMonth(currentMonth);

          const newCalendarData: Array<CalendarDay> = days.map((day) => getCalendarCellValue(day, holidays));

          runInAction(() => (this.calendarData = { data: newCalendarData, total: newCalendarData.length }));
        }
      });
    } catch (error) {
      console.log('file: index.tsx:47  error:', error);
    }
  },

  addTaskHandler(dayId: string, newTask: Task) {
    const newCalendar = getCalendarWithNewTask(this.calendarData.data, dayId, newTask);
    this.calendarData = { data: newCalendar, total: newCalendar.length };
  },

  editTaskHandler(dayId: string, editedTask: Task) {
    const newCalendar = getCalendarWithEditedTask(this.calendarData.data, dayId, editedTask);
    this.calendarData = { data: newCalendar, total: newCalendar.length };
  },

  deleteTaskHandler(dayId: string, taskId: string) {
    const newCalendar = getCalendarWithoutDeletedTask(this.calendarData.data, dayId, taskId);
    this.calendarData = { data: newCalendar, total: newCalendar.length };
  },

  dragAndDropHandler(pickedCalendarDay: CalendarDay, newPickedDay: CalendarDay, previousCalendarDay: CalendarDay, newPreviousDay: CalendarDay) {
    const newCalendar = getNewCalendarAfterDragAndDrop(this.calendarData.data, pickedCalendarDay, newPickedDay, previousCalendarDay, newPreviousDay);
    this.calendarData = { data: newCalendar, total: newCalendar.length };
  },

  dragAndDropHandlerInDay(newCurrentCalendarDay: CalendarDay, swapCalendarDayId: string) {
    const newCalendar = getNewCalendarAfterTaskSwipe(this.calendarData.data, newCurrentCalendarDay, swapCalendarDayId);
    this.calendarData = { data: newCalendar, total: newCalendar.length };
  },
};

const CalendarStore: ICalendarStore = observable(calendarObservable);

export default CalendarStore;
