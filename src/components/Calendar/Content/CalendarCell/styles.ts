import styled from '@emotion/styled';

type CellProps = { isDragging: boolean };

export const Cell = styled.div<CellProps>`
  display: inline-block;
  max-width: 250px;
  width: 100%;
  height: 300px;
  background-color: #e2e6e9;
  position: relative;

  ${(props) =>
    props?.isDragging === true &&
    `
      border: 0.5px solid black;
    `}
`;

export const AddButton = styled.button`
  width: 20px;
  max-width: 100%;
  height: 20px;
  position: absolute;
  padding: 0;
  right: 0px;
  top: 0px;
  border: 1px solid #fff;
  border-radius: 4px;
  cursor: pointer;
`;
