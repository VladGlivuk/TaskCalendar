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

  const handleUpdateCalendar = (taskId: string, calendarDayId: string) => {
    console.log('file: index.tsx:42  calendarDayId:', calendarDayId);
    console.log('file: index.tsx:42  taskId:', taskId);
    const pickedCalendarDay = calendarData.find((day) => day.id === calendarDayId);
    console.log('file: index.tsx:45  pickedCalendarDay:', pickedCalendarDay);

    const previousCalendarDay = calendarData.find((calendarDay) => calendarDay.tasks.find((task) => task.taskId === taskId));

    console.log('file: index.tsx:48  previousCalendarDay:', previousCalendarDay);
    const pickedTask = previousCalendarDay?.tasks.find((calendarTask) => calendarTask.taskId === taskId);
    console.log('file: index.tsx:48  pickedTask:', pickedTask);

    if (pickedCalendarDay && pickedCalendarDay.tasks.length < maxTasksInDay && pickedTask && previousCalendarDay && previousCalendarDay.id !== calendarDayId) {
      const newPreviousDay = { ...previousCalendarDay, tasks: previousCalendarDay?.tasks.filter((task) => task.taskId !== taskId) };
      console.log('file: index.tsx:56  newPreviousDay:', newPreviousDay);
      const newPickedDay = { ...pickedCalendarDay, tasks: [...pickedCalendarDay.tasks, pickedTask] };
      console.log('file: index.tsx:58  newPickedDay:', newPickedDay);

      const newCalendarData = (calendarData: Array<CalendarDay>) =>
        calendarData.map((calendarDay) =>
          calendarDay.id === pickedCalendarDay.id ? newPickedDay : calendarDay.id === previousCalendarDay?.id ? newPreviousDay : calendarDay
        );

      setCalendarData((calendarData) => newCalendarData(calendarData));
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
          handleUpdateCalendar={handleUpdateCalendar}
          isDragging={isDragging}
          key={calendarDay.id}
        />
      ))}
    </CellsWrapper>
  );
};

export default Content;
