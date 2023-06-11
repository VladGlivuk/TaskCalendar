import { Dispatch, FC, useContext } from 'react';
//emotion
import { css } from '@emotion/css';
//context
import { CalendarCellContext } from '../../../CalendarCellContext';
//components
import Modal from 'shared/components/Modal';
//styles
import { ButtonClose, DeleteButton } from 'shared/styles/buttons';

type DeleteModalProps = {
  taskId: string;
  setIsDeleteModalOpen: Dispatch<React.SetStateAction<boolean>>;
};

const DeleteModal: FC<DeleteModalProps> = ({ setIsDeleteModalOpen, taskId }) => {
  const { deleteTaskHandler } = useContext(CalendarCellContext);

  const closeModalClickHandler = () => setIsDeleteModalOpen(false);

  const deleteClickHandler = () => deleteTaskHandler(taskId);

  return (
    <Modal title={' Are you sure you want to delete the item?'} closeModalClickHandler={closeModalClickHandler}>
      <div
        className={css`
          position: absolute;
          bottom: 2px;
          margin-bottom: 10px;
          width: 100%;
        `}
      >
        <div
          className={css`
            display: flex;
            justify-content: space-around;
            align-items: center;
          `}
        >
          <DeleteButton title='Delete' onClick={deleteClickHandler} >Delete</DeleteButton>
          <ButtonClose title='Cancel' onClick={closeModalClickHandler} >Close</ButtonClose>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
