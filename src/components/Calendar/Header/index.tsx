import { FC } from 'react';
//components
import AllWeekDays from './AllWeekDays';
import TopHeader from './TopHeader';
//styles
import { HeaderWrapper } from './styles';

const Header: FC = () => {
  return (
    <HeaderWrapper>
      <TopHeader />
      <AllWeekDays />
    </HeaderWrapper>
  );
};

export default Header;
