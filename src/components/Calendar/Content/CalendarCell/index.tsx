import { FC } from 'react';
//types
import { CalendarDay } from 'core/types';
//functions
import { getIsDayFirstOrLastInMonth } from 'core/functions';
//styles
import { Cell } from './styles';

const CalendarCell: FC<CalendarDay> = ({ monthDay, month }) => {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const isCurrentDay = currentDay === monthDay;
  const isDayLastOrFirst = getIsDayFirstOrLastInMonth(monthDay, currentMonth, currentYear);

  return (
    <Cell>
      {isDayLastOrFirst && <span>{month}</span>}
      <span>{monthDay}</span>
      {isCurrentDay && <span>  Today</span>}
    </Cell>
  );
};

export default CalendarCell;
