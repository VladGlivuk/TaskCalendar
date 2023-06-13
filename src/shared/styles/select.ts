import styled from '@emotion/styled';

export const SelectStyles = styled.select`
  border: none;
  border-radius: 8px;
  padding: 0 1em 0 0;
  line-height: inherit;
  font-size: 16px;
  height: 36px;
  cursor: pointer;
  text-transform: capitalize;
`;

export const SelectWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  column-gap: 12px;
`;

export const SelectOption = styled.option`
  white-space: normal;
  font-size: 16px;
`;
