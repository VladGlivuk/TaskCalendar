import { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
//store
import CalendarStore from 'stores/CalendarStore';
//types
import { Task } from 'core/types';
//constants
import { calendar } from 'core/constants';
//helpers
import {
  getCalendarDayById,
  getIsValidDragAndDrop,
  getIsValidTaskSwipe,
  getNewCalendarDayAfterTaskSwipe,
  getNewPickedDay,
  getNewPreviousDay,
  getTaskIndexById,
} from './helpers';
//components
import CalendarCell from './CalendarCell';
//styles
import { CellsWrapper } from 'shared/styles';

const Content: FC = observer(() => {
  const [isDragging, setIsDragging] = useState(false);

  const { calendarData } = CalendarStore;

  useEffect(() => {
    if (calendarData.total >= 1) {
      const stringifiedCalendarData = JSON.stringify(calendarData);
      try {
        localStorage.setItem(calendar, stringifiedCalendarData);
      } catch (error) {
        console.log(error);
      }
    }
  }, [calendarData]);

  useEffect(() => {
    CalendarStore.fetchCalendarData();
  }, []);

  const addTaskHandler = (newTask: Task, dayId: string) => CalendarStore.addTaskHandler(dayId, newTask);

  const deleteTaskHandler = (taskId: string, dayId: string) => CalendarStore.deleteTaskHandler(dayId, taskId);

  const editTaskHandler = (editedTask: Task, dayId: string) => CalendarStore.editTaskHandler(dayId, editedTask);

  const handleDragAndDropUpdateCalendar = (taskId: string, calendarDayId: string) => {
    const pickedCalendarDay = getCalendarDayById(calendarData.data, calendarDayId);
    const previousCalendarDay = calendarData.data.find((calendarDay) => calendarDay.tasks.find((task) => task.taskId === taskId));
    const pickedTask = previousCalendarDay?.tasks.find((calendarTask) => calendarTask.taskId === taskId);

    const isValidDragAndDrop = getIsValidDragAndDrop(pickedCalendarDay, pickedTask, previousCalendarDay, calendarDayId);

    if (pickedCalendarDay && pickedTask && previousCalendarDay && isValidDragAndDrop) {
      const newPreviousDay = getNewPreviousDay(previousCalendarDay, taskId);
      const newPickedDay = getNewPickedDay(pickedCalendarDay, pickedTask);

      CalendarStore.dragAndDropHandler(pickedCalendarDay, newPickedDay, previousCalendarDay, newPreviousDay);
    }
  };

  const handleSwipeTasksUpdateCalendar = (targetTaskId: string, targetCalendarDayId: string, swapTaskId: string, swapCalendarDayId: string) => {
    if (targetCalendarDayId !== swapCalendarDayId) return;

    const currentCalendarDay = getCalendarDayById(calendarData.data, swapCalendarDayId);

    const taskIndex = getTaskIndexById(currentCalendarDay?.tasks, targetTaskId);
    const swipeTaskIndex = getTaskIndexById(currentCalendarDay?.tasks, swapTaskId);

    const isValidTaskSwipe = getIsValidTaskSwipe(currentCalendarDay, taskIndex, swipeTaskIndex, targetTaskId, swapTaskId);

    if (currentCalendarDay && typeof taskIndex === 'number' && typeof swipeTaskIndex === 'number' && isValidTaskSwipe) {
      const newCurrentCalendarDay = getNewCalendarDayAfterTaskSwipe(currentCalendarDay, taskIndex, swipeTaskIndex);

      CalendarStore.dragAndDropHandlerInDay(newCurrentCalendarDay, swapCalendarDayId);
    }
  };

  const handleDragging = (dragging: boolean) => setIsDragging(dragging);

  return (
    <CellsWrapper id='calendar'>
      {!!calendarData?.total &&
        calendarData.data?.map((calendarDay) => (
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
});

export default Content;
