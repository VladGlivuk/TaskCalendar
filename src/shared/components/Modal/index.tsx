import { FC, ReactNode } from 'react';
//emotion
import { css } from '@emotion/css';

type ModalProps = {
  children: ReactNode;
  title: string;
  closeModalClickHandler: () => void;
};

const Modal: FC<ModalProps> = ({ children, title, closeModalClickHandler }) => {
  return (
    <>
      <div
        className={css`
          background-color: rgba(0, 0, 0, 0.2);
          z-index: 5;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          position: absolute;
        `}
        onClick={closeModalClickHandler}
      />
      <div
        className={css`
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
        `}
      >
        <div
          className={css`
            padding: 20px;
            width: 250px;
            min-height: 100px;
            background: white;
            color: white;
            z-index: 10;
            border-radius: 16px;
            box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.04);
          `}
        >
          <div
            className={css`
              height: 50px;
              background: white;
              overflow: hidden;
              border-top-left-radius: 16px;
              border-top-right-radius: 16px;
            `}
          >
            <h5
              className={css`
                margin: 0;
                padding: 10px;
                color: #2c3e50;
                font-weight: 500;
                font-size: 18px;
                text-align: center;
              `}
            >
              {title}
            </h5>
          </div>
          <button
            className={css`
              cursor: pointer;
              font-weight: 500;
              padding: 4px 8px;
              border-radius: 8px;
              border: none;
              font-size: 18px;
              color: #2c3e50;
              background: white;
              transition: all 0.25s ease;
              box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.06);
              position: absolute;
              right: 0;
              top: 0;
              align-self: flex-end;
              margin-top: -7px;
              margin-right: -7px;

              &:hover {
                box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.04);
                transform: translate(-4px, 4px);
              }
            `}
            onClick={closeModalClickHandler}
          >x</button>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
