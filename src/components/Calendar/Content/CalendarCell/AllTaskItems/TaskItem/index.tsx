import { FC, useContext, useState, DragEvent } from 'react';
//context
import { CalendarCellContext } from '../../CalendarCellContext';
//types
import { BUTTON_TYPE, Task } from 'core/types';
//components
import DeleteModal from './DeleteModal';
import EditTaskModal from './EditTaskModal';
import AllColors from './AllColors';
import Button from 'shared/components/Button';
//styles
import { TaskWrapper, buttonWrapperStyles, labelStyles } from './styles';

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
      <span className={labelStyles}>{label}</span>

      <div className={buttonWrapperStyles}>
        <Button type={BUTTON_TYPE.DELETE} isSmall clickHandler={openDeleteTaskModalClickHandler} title='Delete' />

        <Button type={BUTTON_TYPE.EDIT} isSmall clickHandler={openEditTaskModalClickHandler} title='Edit' />
      </div>

      {isDeleteModalOpen && <DeleteModal taskId={taskId} setIsDeleteModalOpen={setIsDeleteModalOpen} />}
      {isEditModalOpen && <EditTaskModal task={task} setIsEditModalOpen={setIsEditModalOpen} />}
    </TaskWrapper>
  );
};

export default TaskItem;
