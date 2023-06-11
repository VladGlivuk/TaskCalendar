import { FC, useState } from 'react';
//emotion
import { css } from '@emotion/css';
//context
import { CalendarCellContext, CalendarCellContextType } from './CalendarCellContext';
//functions
import { getIsDayFirstOrLastInMonth } from 'core/functions';
//types
import { CalendarDay, Task } from 'core/types';
//helpers
import { getCardsAmountInfo, getNewEditedTasks, getNewFilteredTasks } from './helpers';
//components
import AddTaskForm from './AddTaskForm';
import AllTaskItems from './AllTaskItems';
//styles
import { AddButton, Cell } from './styles';

const CalendarCell: FC<CalendarDay> = (calendarDay) => {
  const [allTasks, setAllTasks] = useState<Array<Task>>([]);

  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState(false);

  const { month, monthDay } = calendarDay;

  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const isCurrentDay = currentDay === monthDay;
  const isDayLastOrFirst = getIsDayFirstOrLastInMonth(monthDay, currentMonth, currentYear);

  const cardsAmountInfo = getCardsAmountInfo(allTasks.length);

  const addTaskHandler = (newTask: Task) => setAllTasks((tasks) => [...tasks, newTask]);
  const deleteTaskHandler = (taskId: string) => setAllTasks((tasks) => getNewFilteredTasks(tasks, taskId));
  const editTaskHandler = (newTask: Task) => setAllTasks((tasks) => getNewEditedTasks(tasks, newTask));

  const allTaskContextValue: CalendarCellContextType = {
    calendarDay,
    deleteTaskHandler,
    editTaskHandler,
    addTaskHandler,
    setIsAddTaskFormOpen,
  };

  const openAddTaskFormModalHandler = () => setIsAddTaskFormOpen(true);

  return (
    <CalendarCellContext.Provider value={allTaskContextValue}>
      <Cell>
        {isDayLastOrFirst && <span>{month}</span>}
        <span>{monthDay}</span>
        {isCurrentDay && <span> Today</span>}

        {!!allTasks.length && (
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

        {!!allTasks.length && <AllTaskItems allTasks={allTasks} />}
      </Cell>
    </CalendarCellContext.Provider>
  );
};

export default CalendarCell;
