import { FC } from 'react';
//emotion
import { css } from '@emotion/css';
//constants
import { weekdays } from 'core/constants';
//components
import WeekDay from './WeekDay';
//styles
import { CellsWrapper } from 'shared/styles';

const AllWeekDays: FC = () => {
  return (
    <CellsWrapper
      className={css`
        padding-top: 24px;
      `}
    >
      {weekdays.map((weekDay) => (
        <WeekDay weekDay={weekDay} key={weekDay} />
      ))}
    </CellsWrapper>
  );
};

export default AllWeekDays;
