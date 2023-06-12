import { FC, useContext, useState, DragEvent } from 'react';
//emotion
import { css } from '@emotion/css';
//context
import { CalendarCellContext } from '../../CalendarCellContext';
//types
import { Task } from 'core/types';
//components
import DeleteModal from './DeleteModal';
import EditTaskModal from './EditTaskModal';
import AllColors from './AllColors';
//styles
import { ButtonEdit, DeleteButton } from 'shared/styles';

type TaskItemProps = {
  task: Task;
};

const TaskItem: FC<TaskItemProps> = ({ task, task: { label, colors, taskId } }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openDeleteTaskModalClickHandler = () => setIsDeleteModalOpen(true);
  const openEditTaskModalClickHandler = () => setIsEditModalOpen(true);

  const { handleDragging } = useContext(CalendarCellContext);

  const buttonWrapperStyles = css`
    display: flex;
    flex-direction: row;
    column-gap: 8px;
    align-items: center;
  `;

  const buttonStyles = css`
    height: 12px;
    padding: 12px;
    margin: 0;
    z-index: 1;
  `;

  const handleDragEnd = () => handleDragging(false);

  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('id', `${task.taskId}`);
    handleDragging(true);
    console.log('file: index.tsx:43  task:', task);
  };

  return (
    <div
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      draggable
      className={css`
        background: #fff;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        row-gap: 4px;
        padding: 4px;
        cursor: grab;
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

      <div className={buttonWrapperStyles}>
        <DeleteButton className={buttonStyles} onClick={openDeleteTaskModalClickHandler}>
          Delete
        </DeleteButton>
        <ButtonEdit className={buttonStyles} onClick={openEditTaskModalClickHandler}>
          Edit
        </ButtonEdit>
      </div>

      {isDeleteModalOpen && <DeleteModal taskId={taskId} setIsDeleteModalOpen={setIsDeleteModalOpen} />}
      {isEditModalOpen && <EditTaskModal task={task} setIsEditModalOpen={setIsEditModalOpen} />}
    </div>
  );
};

export default TaskItem;
