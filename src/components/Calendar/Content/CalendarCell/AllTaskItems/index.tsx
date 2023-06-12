import { FC } from 'react';
//emotion
import { css } from '@emotion/css';
//types
import { Task } from 'core/types';
//components
import TaskItem from './TaskItem';

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
        <TaskItem task={task} key={task.taskId} />
      ))}
    </div>
  );
};

export default AllTaskItems;
