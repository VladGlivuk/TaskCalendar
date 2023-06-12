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
import { TaskWrapper } from './styles';

type TaskItemProps = {
  task: Task;
};

const TaskItem: FC<TaskItemProps> = ({ task, task: { label, colors, taskId } }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [draggingId, setDraggingId] = useState<string | null>(null);

  const openDeleteTaskModalClickHandler = () => setIsDeleteModalOpen(true);
  const openEditTaskModalClickHandler = () => setIsEditModalOpen(true);

  const { isDragging, calendarDay, handleDragging, handleSwipeTasksUpdate } = useContext(CalendarCellContext);

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

  const handleDragEnd = () => {
    handleDragging(false);
    setDraggingId(null);
  };

  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('id', `${task.taskId}`);
    event.dataTransfer.setData('targetCalendarId', `${calendarDay.id}`);
    handleDragging(true);
    setDraggingId(task.taskId);
  };

  const onTaskDragOverHandler = (event: DragEvent<HTMLDivElement>) => event.preventDefault();

  const onTaskDropHandler = (event: DragEvent<HTMLDivElement>) => {
    const targetId = event.dataTransfer.getData('id');
    const targetCalendarId = event.dataTransfer.getData('targetCalendarId');

    handleSwipeTasksUpdate(targetId, targetCalendarId, task.taskId, calendarDay.id);
    handleDragging(false);
  };

  return (
    <TaskWrapper
      onDragStart={handleDragStart}
      onDragOver={onTaskDragOverHandler}
      onDragEnd={handleDragEnd}
      onDrop={onTaskDropHandler}
      draggable
      isDragging={isDragging && draggingId === taskId}
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
    </TaskWrapper>
  );
};

export default TaskItem;
