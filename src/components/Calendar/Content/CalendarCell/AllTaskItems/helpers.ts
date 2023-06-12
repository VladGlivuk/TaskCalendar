//constants
import { COLOR, LABEL } from 'core/constants';
import { getFormattedText } from 'core/functions';
//types
import { FilterOption, Task } from 'core/types';

export const getNewFilteredTasks = (tasks: Array<Task>, filterOption: FilterOption, filterValue: string | undefined): Array<Task> => {
  if (!filterValue) return tasks;

  switch (filterOption) {
    case LABEL: {
      const newFilteredTasks = tasks.filter((task) => getFormattedText(task.label).includes(getFormattedText(filterValue)));
      return newFilteredTasks;
    }

    case COLOR: {
      const newFilteredTasks = tasks.filter((task) => {
        const filterColors = getFormattedText(filterValue).split(',');
        //use every instead of some for strict filter
        return task.colors.some((color) => filterColors.includes(color));
      });

      return newFilteredTasks;
    }
  }
};
