import { Dispatch, FC, SetStateAction, useContext } from 'react';
//context
import { CalendarCellContext } from '../../../CalendarCellContext';
//types
import { Task } from 'core/types';
//components
import TaskFormData from 'shared/components/TaskFormData';
import Modal from 'shared/components/Modal';

type EditTaskModalProps = {
  task: Task;
  setIsEditModalOpen: Dispatch<SetStateAction<boolean>>;
};

const EditTaskModal: FC<EditTaskModalProps> = ({ task, setIsEditModalOpen }) => {
  const {
    editTaskHandler,
    calendarDay: { id },
  } = useContext(CalendarCellContext);

  const closeEditModalHandler = () => setIsEditModalOpen(false);

  const submitHandler = (newTask: Task) => {
    editTaskHandler(newTask, id);
    closeEditModalHandler();
  };

  return (
    <Modal title={'Edit task'} closeModalClickHandler={closeEditModalHandler}>
      <TaskFormData task={task} submitHandler={submitHandler} closeModalClickHandler={closeEditModalHandler} isEditing />
    </Modal>
  );
};

export default EditTaskModal;
