import { FC } from 'react';
//functions
import { getMonthFromNumber } from 'core/functions';
//components
import Filter from './Filter';
//styles
import { TopHeaderWrapper } from './styles';

const TopHeader: FC = () => {
  const currentDate = new Date();

  const currentMonth = getMonthFromNumber(currentDate.getMonth());
  const currentYear = currentDate.getFullYear();

  const currentDateInfo = `${currentMonth} ${currentYear}`;

  return (
    <TopHeaderWrapper>
      <Filter />
      <h1 className='title'>{currentDateInfo}</h1>
    </TopHeaderWrapper>
  );
};

export default TopHeader;
