import { FC } from 'react';
//components
import Header from './Header';
import Content from './Content';
//styles
import { CalendarWrapper } from './styles';

const Calendar: FC = () => {
  return (
    <CalendarWrapper>
      <Header></Header>
      <Content></Content>
    </CalendarWrapper>
  );
};

export default Calendar;
