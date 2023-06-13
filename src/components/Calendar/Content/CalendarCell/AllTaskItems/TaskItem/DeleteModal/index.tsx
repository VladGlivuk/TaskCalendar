import { Dispatch, FC, useContext } from 'react';
//emotion
import { css } from '@emotion/css';
//context
import { CalendarCellContext } from '../../../CalendarCellContext';
//components
import Modal from 'shared/components/Modal';
import Button from 'shared/components/Button';
import { BUTTON_TYPE } from 'core/types';

type DeleteModalProps = {
  taskId: string;
  setIsDeleteModalOpen: Dispatch<React.SetStateAction<boolean>>;
};

const DeleteModal: FC<DeleteModalProps> = ({ setIsDeleteModalOpen, taskId }) => {
  const {
    deleteTaskHandler,
    calendarDay: { id },
  } = useContext(CalendarCellContext);

  const closeModalClickHandler = () => setIsDeleteModalOpen(false);

  const deleteClickHandler = () => deleteTaskHandler(taskId, id);

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
          <Button type={BUTTON_TYPE.DELETE} title='Delete' clickHandler={deleteClickHandler} />

          <Button type={BUTTON_TYPE.CLOSE} title='Close' clickHandler={closeModalClickHandler} />
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
