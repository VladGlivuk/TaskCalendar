import { FC } from 'react';
//styles
import { Week } from './styles';

type WeekDayProps = { weekDay: string };

const WeekDay: FC<WeekDayProps> = ({ weekDay }) => <Week>{weekDay}</Week>;

export default WeekDay;
