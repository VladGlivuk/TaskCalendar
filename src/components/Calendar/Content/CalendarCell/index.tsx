import { FC, useState, DragEvent } from 'react';
//emotion
import { css } from '@emotion/css';
//context
import { CalendarCellContext, CalendarCellContextType } from './CalendarCellContext';
//functions
import { getIsDayFirstOrLastInMonth } from 'core/functions';
//types
import { CalendarDay, Task } from 'core/types';
//helpers
import { getCardsAmountInfo } from './helpers';
//components
import AddTaskForm from './AddTaskForm';
import AllTaskItems from './AllTaskItems';
//styles
import { AddButton, Cell } from './styles';

type CalendarCellProps = {
  calendarDay: CalendarDay;
  isDragging: boolean;
  addTaskHandler: (newTask: Task, dayId: string) => void;
  deleteTaskHandler: (taskId: string, dayId: string) => void;
  editTaskHandler: (newTask: Task, dayId: string) => void;
  handleUpdateCalendar: (taskId: string, calendarDayId: string) => void;
  handleDragging: (dragging: boolean) => void;
};

const CalendarCell: FC<CalendarCellProps> = ({
  calendarDay,
  isDragging,
  addTaskHandler,
  deleteTaskHandler,
  editTaskHandler,
  handleUpdateCalendar,
  handleDragging,
}) => {
  const { month, monthDay, tasks } = calendarDay;

  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState(false);

  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const isCurrentDay = currentDay === monthDay;
  const isDayLastOrFirst = getIsDayFirstOrLastInMonth(monthDay, currentMonth, currentYear);

  const cardsAmountInfo = getCardsAmountInfo(tasks.length);

  const allTaskContextValue: CalendarCellContextType = {
    calendarDay,
    deleteTaskHandler,
    editTaskHandler,
    addTaskHandler,
    setIsAddTaskFormOpen,
    handleDragging,
  };

  const openAddTaskFormModalHandler = () => setIsAddTaskFormOpen(true);

  const onCalendarCellDragOverHandler = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onCalendarCellDropHandler = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('id');
    console.log('file: index.tsx:68  id:', id);
    handleUpdateCalendar(id, calendarDay.id);
    handleDragging(false);
  };

  return (
    <CalendarCellContext.Provider value={allTaskContextValue}>
      <Cell isDragging={isDragging} onDragOver={onCalendarCellDragOverHandler} onDrop={onCalendarCellDropHandler}>
        {isDayLastOrFirst && <span>{month}</span>}
        <span>{monthDay}</span>
        {isCurrentDay && <span> Today</span>}

        {!!tasks.length && (
          <span
            className={css`
              padding-left: 12px;
              font-weight: 700;
            `}
          >
            {cardsAmountInfo}
          </span>
        )}

        <AddButton onClick={openAddTaskFormModalHandler}>+</AddButton>

        {isAddTaskFormOpen && <AddTaskForm />}

        {!!tasks.length && <AllTaskItems allTasks={tasks} />}
      </Cell>
    </CalendarCellContext.Provider>
  );
};

export default CalendarCell;
