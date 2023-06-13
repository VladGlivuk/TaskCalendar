import { FC, useContext, useEffect, useState } from 'react';
//emotion
import { css } from '@emotion/css';
//context
import { WrapperContext } from 'components/Calendar/WrapperContext';
//types
import { Task } from 'core/types';
//helpers
import { getNewFilteredTasks } from './helpers';
//components
import TaskItem from './TaskItem';

type AllTaskItemsProps = {
  allTasks: Array<Task>;
};

const AllTaskItems: FC<AllTaskItemsProps> = ({ allTasks }) => {
  const [filteredTasks, setFilteredTasks] = useState(allTasks);

  const { debouncedFilterValue, filterOption } = useContext(WrapperContext);

  useEffect(() => {
    const newFilteredTasks = getNewFilteredTasks(allTasks, filterOption, debouncedFilterValue);
    setFilteredTasks(newFilteredTasks);
  }, [debouncedFilterValue, filterOption, allTasks]);

  return (
    <div
      className={css`
        padding: 8px 4px 0 4px;
        display: flex;
        flex-direction: column;
        row-gap: 8px;
      `}
    >
      {filteredTasks.map((task) => (
        <TaskItem task={task} key={task?.taskId} />
      ))}
    </div>
  );
};

export default AllTaskItems;
