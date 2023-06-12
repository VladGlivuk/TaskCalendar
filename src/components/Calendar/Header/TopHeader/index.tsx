import { FC } from 'react';
//functions
import { getMonthFromNumber } from 'core/functions';

const TopHeader: FC = () => {
  const currentDate = new Date();

  const currentMonth = getMonthFromNumber(currentDate.getMonth());
  const currentYear = currentDate.getFullYear();

  const currentDateInfo = `${currentMonth} ${currentYear}`;

  return (
    <>
      <h1 className='title'>{currentDateInfo}</h1>
    </>
  );
};

export default TopHeader;
