import { css } from '@emotion/css';
import styled from '@emotion/styled';

type TaskWrapperProps = { isDragging: boolean };

export const TaskWrapper = styled.div<TaskWrapperProps>`
  background: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  padding: 4px;
  cursor: grab;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  ${({ isDragging }) =>
    isDragging &&
    `
    opacity: 0.5;
    transform: scale(0.8);
    `}
`;

export const buttonWrapperStyles = css`
  display: flex;
  flex-direction: row;
  column-gap: 8px;
  align-items: center;
`;

export const labelStyles = css`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
