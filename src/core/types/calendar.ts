//types
import { Task } from ".";

export type CalendarDay = {
  date: Date;
  monthDay: number;
  month: string;
  tasks: Array<Task>;
  id: string;
};
