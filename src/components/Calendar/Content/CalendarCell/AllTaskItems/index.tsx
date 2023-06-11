import { FC } from 'react';
//types
import { Task } from 'core/types';
//components
import TaskItem from './TaskItem';
import { css } from '@emotion/css';

type AllTaskItemsProps = {
  allTasks: Array<Task>;
};

const AllTaskItems: FC<AllTaskItemsProps> = ({ allTasks }) => {
  return (
    <div
      className={css`
        padding: 8px 4px 0 4px;
        display: flex;
        flex-direction: column;
        row-gap: 8px;
      `}
    >
      {allTasks.map((task) => (
        <TaskItem task={task} key={task.id} />
      ))}
    </div>
  );
};

export default AllTaskItems;
