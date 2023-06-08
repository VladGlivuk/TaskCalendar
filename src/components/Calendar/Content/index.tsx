import { FC, useEffect, useState } from 'react';
//types
import { CalendarDay } from 'core/types';
//helpers
import { getCalendarCellValue, getDaysInCurrentMonth } from './helpers';
//components
import CalendarCell from './CalendarCell';
//styles
import { CellsWrapper } from 'shared/styles';

const Content: FC = () => {
  const [calendarData, setCalendarData] = useState<Array<CalendarDay>>([]);

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const days = getDaysInCurrentMonth(currentMonth);

    const newCalendarData: Array<CalendarDay> = days.map((day) => getCalendarCellValue(day));

    setCalendarData(newCalendarData);
  }, []);

  return (
    <CellsWrapper>
      {calendarData.map(({ monthDay, month }, index) => (
        <CalendarCell monthDay={monthDay} month={month} key={index * (monthDay + index)} />
      ))}
    </CellsWrapper>
  );
};

export default Content;
