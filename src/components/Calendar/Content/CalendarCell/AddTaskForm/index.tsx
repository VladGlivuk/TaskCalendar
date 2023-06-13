import { FC, useContext } from 'react';
//context
import { CalendarCellContext } from '../CalendarCellContext';
//types
import { Task } from 'core/types';
//constants
import { defaultTaskValue, maxTasksInDay } from 'core/constants';
//components
import TaskFormData from 'shared/components/TaskFormData';
import Modal from 'shared/components/Modal';

const AddTaskForm: FC = () => {
  const { addTaskHandler, setIsAddTaskFormOpen, calendarDay } = useContext(CalendarCellContext);

  const closeAddTaskFormModal = () => setIsAddTaskFormOpen(false);

  const submitHandler = (newTask: Task) => {
    if (calendarDay.tasks.length < maxTasksInDay) {
      addTaskHandler(newTask, calendarDay.id);
      closeAddTaskFormModal();
    }
  };

  return (
    <Modal title='Add New Task' closeModalClickHandler={closeAddTaskFormModal}>
      <TaskFormData task={defaultTaskValue} submitHandler={submitHandler} closeModalClickHandler={closeAddTaskFormModal} />
    </Modal>
  );
};

export default AddTaskForm;
