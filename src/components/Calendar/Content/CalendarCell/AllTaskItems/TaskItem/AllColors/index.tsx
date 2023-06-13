import { FC } from 'react';
//emotion
import { css } from '@emotion/css';
//components
import Color from './Color';

type AllColorsProps = {
  colors: Array<string>;
};

const AllColors: FC<AllColorsProps> = ({ colors }) => {
  return (
    <div
      className={css`
        display: flex;
        gap: 8px;
        padding-bottom: 4px;
      `}
    >
      {colors.map((color, index) => (
        <Color color={color} key={color + index} />
      ))}
    </div>
  );
};

export default AllColors;
