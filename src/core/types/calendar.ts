//types
import { Task } from '.';

export type CalendarDay = {
  date: Date;
  monthDay: number;
  month: string;
  tasks: Array<Task>;
  id: string;
  holidayInfo: Holiday | null;
};

export type HolidayResponse = {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: null;
  launchYear: null;
  types: Array<string>;
};

export type Holiday = {
  date: string;
  localName: string;
  countryCode: string;
};
