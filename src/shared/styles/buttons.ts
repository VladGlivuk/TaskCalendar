import styled from '@emotion/styled';
//types
import { BUTTON_TYPE } from 'core/types';

type ButtonProps = {
  type: BUTTON_TYPE;
  isSmall?: boolean;
  disabled?: boolean;
};

export const ButtonWrapper = styled.div<ButtonProps>`
  margin-top: 10px;
  cursor: pointer;
  font-weight: 500;
  padding: 11px 28px;
  border-radius: 12px;
  font-size: 0.8rem;
  border: none;
  color: #2c3e50;
  background: #ececec;
  transition: all 0.25s ease;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    box-shadow: none;
    background: whitesmoke;
    transform: translateY(-5px);
  }

  ${({ type }) =>
    type === BUTTON_TYPE.CLOSE &&
    `
    background: #F9;
  `}

  ${({ type }) =>
    type === BUTTON_TYPE.DELETE &&
    `
    color: #fff;
    background: #ff3e4e;

    &:hover {
      box-shadow: 0 10px 20px -10px rgba(255, 62, 78, 0.6);
      background: #ff3e4e;
    }
  `}

  ${({ type }) =>
    type === BUTTON_TYPE.SUBMIT &&
    `
    color: #fff;
    background: #ff3e4e;

    &:hover {
      box-shadow: 0 10px 20px -10px rgba(255, 62, 78, 0.6);
      background: #333;
    }
  `}

  ${({ type, disabled }) =>
    type === BUTTON_TYPE.ADD &&
    `
  width: 20px;
  max-width: 100%;
  height: 20px;
  position: absolute;
  padding: 0;
  right: 0px;
  top: 0px;
  margin: 0;
  border: 1px solid #fff;
  border-radius: 4px;
  cursor: pointer;

  ${
    disabled &&
    `
      cursor: not-allowed;
      background-color: grey;
      color: #ffffff;

      &:hover {
        background: grey;
        transform: none;
      }
    `
  }
  `}

  ${({ isSmall }) =>
    isSmall &&
    `
    height: 12px;
    padding: 12px;
    margin: 0;
    z-index: 1;
    margin-top: 0;
  `}
`;
