import { FC, useState } from 'react';
//emotion
import { css } from '@emotion/css';
//types
import { Task } from 'core/types';
//components
import DeleteModal from './DeleteModal';
import EditTaskModal from './EditTaskModal';
import { ButtonEdit, DeleteButton } from 'shared/styles';
import AllColors from './AllColors';

type TaskItemProps = {
  task: Task;
};

const TaskItem: FC<TaskItemProps> = ({ task, task: { label, colors, id } }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openDeleteTaskModalClickHandler = () => setIsDeleteModalOpen(true);
  const openEditTaskModalClickHandler = () => setIsEditModalOpen(true);

  const buttonStyles = css`
    height: 12px;
    padding: 8px;
    margin: 0;
    display: flex-inline;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;

  return (
    <div
      className={css`
        background: #fff;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        row-gap: 4px;
        padding: 4px;
      `}
    >
      <AllColors colors={colors} />
      <span
        className={css`
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        `}
      >
        {label}
      </span>

      <div>
        <DeleteButton className={buttonStyles} onClick={openDeleteTaskModalClickHandler}>
          Delete
        </DeleteButton>
        <ButtonEdit className={buttonStyles} onClick={openEditTaskModalClickHandler}>
          Edit
        </ButtonEdit>
      </div>

      {isDeleteModalOpen && <DeleteModal taskId={id} setIsDeleteModalOpen={setIsDeleteModalOpen} />}
      {isEditModalOpen && <EditTaskModal task={task} setIsEditModalOpen={setIsEditModalOpen} />}
    </div>
  );
};

export default TaskItem;
