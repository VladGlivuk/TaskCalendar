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

  ${(props) =>
    props?.isDragging &&
    `
    opacity: 0.5;
    transform: scale(0.8);
    `}
`;
