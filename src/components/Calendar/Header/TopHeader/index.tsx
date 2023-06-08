import { FC } from 'react';
//functions
import { getMonthFromNumber } from 'core/functions';

const TopHeader: FC = () => {
  const currentDate = new Date();

  const currentMonth = getMonthFromNumber(currentDate.getMonth());
  const currentYear = currentDate.getFullYear();

  return (
    <div>
      <h1 className='title'>{`${currentMonth} ${currentYear}`}</h1>
    </div>
  );
};

export default TopHeader;
