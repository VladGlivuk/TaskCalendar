import styled from '@emotion/styled';

type CellProps = { isDragging: boolean };

export const Cell = styled.div<CellProps>`
  display: inline-block;
  max-width: 230px;
  width: 100%;
  height: 320px;
  background-color: #e2e6e9;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  ${({ isDragging }) =>
    isDragging &&
    `
      border: 0.5px solid black;
      opacity: .8;
    `}
`;
