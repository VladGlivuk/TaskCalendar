import { FC } from 'react';
//constants
import { weekdays } from 'core/constants';
//components
import WeekDay from './WeekDay';
//styles
import { CellsWrapper } from 'shared/styles';

const AllWeekDays: FC = () => {
  return (
    <CellsWrapper>
      {weekdays.map((weekDay) => (
        <WeekDay weekDay={weekDay} key={weekDay} />
      ))}
    </CellsWrapper>
  );
};

export default AllWeekDays;
