import { FC, useEffect, useState } from 'react';
//types
import { CalendarDay, Task } from 'core/types';
//constants
import { calendar } from 'core/constants';
//helpers
import {
  getCalendarCellValue,
  getCalendarDayById,
  getCalendarWithEditedTask,
  getCalendarWithNewTask,
  getCalendarWithoutDeletedTask,
  getDaysInCurrentMonth,
  getIsValidDragAndDrop,
  getIsValidTaskSwipe,
  getNewCalendarAfterDragAndDrop,
  getNewCalendarAfterTaskSwipe,
  getNewCalendarDayAfterTaskSwipe,
  getNewPickedDay,
  getNewPreviousDay,
  getTaskIndexById,
} from './helpers';
//components
import CalendarCell from './CalendarCell';
//styles
import { CellsWrapper } from 'shared/styles';

const Content: FC = () => {
  const [calendarData, setCalendarData] = useState<Array<CalendarDay>>([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (calendarData.length >= 1) {
      const stringifiedCalendarData = JSON.stringify(calendarData);
      try {
        localStorage.setItem(calendar, stringifiedCalendarData);
      } catch (error) {
        console.log(error);
      }
    }
  }, [calendarData]);

  useEffect(() => {
    try {
      const currentCalendarData = localStorage.getItem(calendar);
      console.log('file: index.tsx:32  calendarData:', calendarData);

      if (currentCalendarData) {
        const parsedCalendarData = JSON.parse(currentCalendarData);
        console.log('file: index.tsx:36  parsedCalendarData:', parsedCalendarData);
        setCalendarData(parsedCalendarData);
      } else {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const days = getDaysInCurrentMonth(currentMonth);

        const newCalendarData: Array<CalendarDay> = days.map((day) => getCalendarCellValue(day));

        setCalendarData(newCalendarData);
      }
    } catch (error) {
      console.log('file: index.tsx:47  error:', error);
    }
  }, []);

  const addTaskHandler = (newTask: Task, dayId: string) => setCalendarData((calendar) => getCalendarWithNewTask(calendar, dayId, newTask));

  const deleteTaskHandler = (taskId: string, dayId: string) => setCalendarData((calendar) => getCalendarWithoutDeletedTask(calendar, dayId, taskId));

  const editTaskHandler = (editedTask: Task, dayId: string) => setCalendarData((calendar) => getCalendarWithEditedTask(calendar, dayId, editedTask));

  const handleDragAndDropUpdateCalendar = (taskId: string, calendarDayId: string) => {
    const pickedCalendarDay = getCalendarDayById(calendarData, calendarDayId);
    const previousCalendarDay = calendarData.find((calendarDay) => calendarDay.tasks.find((task) => task.taskId === taskId));
    const pickedTask = previousCalendarDay?.tasks.find((calendarTask) => calendarTask.taskId === taskId);

    const isValidDragAndDrop = getIsValidDragAndDrop(pickedCalendarDay, pickedTask, previousCalendarDay, calendarDayId);

    if (pickedCalendarDay && pickedTask && previousCalendarDay && isValidDragAndDrop) {
      const newPreviousDay = getNewPreviousDay(previousCalendarDay, taskId);
      const newPickedDay = getNewPickedDay(pickedCalendarDay, pickedTask);

      setCalendarData((calendarData) => getNewCalendarAfterDragAndDrop(calendarData, pickedCalendarDay, newPickedDay, previousCalendarDay, newPreviousDay));
    }
  };

  const handleSwipeTasksUpdateCalendar = (targetTaskId: string, targetCalendarDayId: string, swapTaskId: string, swapCalendarDayId: string) => {
    if (targetCalendarDayId !== swapCalendarDayId) return;

    const currentCalendarDay = getCalendarDayById(calendarData, swapCalendarDayId);

    const taskIndex = getTaskIndexById(currentCalendarDay?.tasks, targetTaskId);
    const swipeTaskIndex = getTaskIndexById(currentCalendarDay?.tasks, swapTaskId);

    const isValidTaskSwipe = getIsValidTaskSwipe(currentCalendarDay, taskIndex, swipeTaskIndex, targetTaskId, swapTaskId);

    if (currentCalendarDay && typeof taskIndex === 'number' && typeof swipeTaskIndex === 'number' && isValidTaskSwipe) {
      const newCurrentCalendarDay = getNewCalendarDayAfterTaskSwipe(currentCalendarDay, taskIndex, swipeTaskIndex);

      setCalendarData((calendarData) => getNewCalendarAfterTaskSwipe(calendarData, newCurrentCalendarDay, swapCalendarDayId));
    }
  };

  const handleDragging = (dragging: boolean) => setIsDragging(dragging);

  return (
    <CellsWrapper>
      {calendarData.map((calendarDay) => (
        <CalendarCell
          calendarDay={calendarDay}
          addTaskHandler={addTaskHandler}
          deleteTaskHandler={deleteTaskHandler}
          editTaskHandler={editTaskHandler}
          handleDragging={handleDragging}
          handleDragAndDropUpdate={handleDragAndDropUpdateCalendar}
          handleSwipeTasksUpdate={handleSwipeTasksUpdateCalendar}
          isDragging={isDragging}
          key={calendarDay.id}
        />
      ))}
    </CellsWrapper>
  );
};

export default Content;
