import { FC, useEffect, useState } from 'react';
//types
import { CalendarDay, Task } from 'core/types';
//helpers
import { getCalendarCellValue, getDaysInCurrentMonth, getNewEditedTasks, getNewFilteredTasks } from './helpers';
//constants
import { maxTasksInDay } from 'core/constants';
//components
import CalendarCell from './CalendarCell';
//styles
import { CellsWrapper } from 'shared/styles';

const Content: FC = () => {
  const [calendarData, setCalendarData] = useState<Array<CalendarDay>>([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const days = getDaysInCurrentMonth(currentMonth);

    const newCalendarData: Array<CalendarDay> = days.map((day) => getCalendarCellValue(day));

    setCalendarData(newCalendarData);
  }, []);

  const addTaskHandler = (newTask: Task, dayId: string) =>
    setCalendarData((calendar) =>
      calendar.map((calendarDay) => (calendarDay.id === dayId ? { ...calendarDay, tasks: [...calendarDay.tasks, newTask] } : calendarDay))
    );

  const deleteTaskHandler = (taskId: string, dayId: string) => {
    setCalendarData((calendar) =>
      calendar.map((calendarDay) => (calendarDay.id === dayId ? { ...calendarDay, tasks: getNewFilteredTasks(calendarDay.tasks, taskId) } : calendarDay))
    );
  };

  const editTaskHandler = (newTask: Task, dayId: string) =>
    setCalendarData((calendar) =>
      calendar.map((calendarDay) => (calendarDay.id === dayId ? { ...calendarDay, tasks: getNewEditedTasks(calendarDay.tasks, newTask) } : calendarDay))
    );

  const handleDragAndDropUpdateCalendar = (taskId: string, calendarDayId: string) => {
    const pickedCalendarDay = calendarData.find((day) => day.id === calendarDayId);
    const previousCalendarDay = calendarData.find((calendarDay) => calendarDay.tasks.find((task) => task.taskId === taskId));
    const pickedTask = previousCalendarDay?.tasks.find((calendarTask) => calendarTask.taskId === taskId);

    if (pickedCalendarDay && pickedCalendarDay.tasks.length < maxTasksInDay && pickedTask && previousCalendarDay && previousCalendarDay.id !== calendarDayId) {
      const newPreviousDay = { ...previousCalendarDay, tasks: previousCalendarDay?.tasks.filter((task) => task.taskId !== taskId) };
      const newPickedDay = { ...pickedCalendarDay, tasks: [...pickedCalendarDay.tasks, pickedTask] };

      const getNewCalendarData = (calendarData: Array<CalendarDay>) =>
        calendarData.map((calendarDay) =>
          calendarDay.id === pickedCalendarDay.id ? newPickedDay : calendarDay.id === previousCalendarDay?.id ? newPreviousDay : calendarDay
        );

      setCalendarData((calendarData) => getNewCalendarData(calendarData));
    }
  };

  const handleSwipeTasksUpdateCalendar = (targetTaskId: string, targetCalendarDayId: string, swapTaskId: string, swapCalendarDayId: string) => {
    if (targetCalendarDayId !== swapCalendarDayId) return;

    const currentCalendarDay = calendarData.find((calendarDay) => calendarDay.id === swapCalendarDayId);
    const taskIndex = currentCalendarDay?.tasks.findIndex((task) => task.taskId === targetTaskId);
    const swipeTaskIndex = currentCalendarDay?.tasks.findIndex((task) => task.taskId === swapTaskId);

    if (currentCalendarDay && typeof taskIndex === 'number' && typeof swipeTaskIndex === 'number' && targetTaskId !== swapTaskId) {
      const newCurrentCalendarDay = {
        ...currentCalendarDay,
        tasks: currentCalendarDay.tasks.map((task, index) =>
          index === taskIndex ? currentCalendarDay.tasks[swipeTaskIndex] : index === swipeTaskIndex ? currentCalendarDay.tasks[taskIndex] : task
        ),
      };

      const getNewCalendarData = (calendarData: Array<CalendarDay>) =>
        calendarData.map((calendarDay) => (calendarDay.id === swapCalendarDayId ? newCurrentCalendarDay : calendarDay));

      setCalendarData((calendarData) => getNewCalendarData(calendarData));
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
