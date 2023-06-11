import { FC } from 'react';
import { css } from '@emotion/css';

type ColorProps = {
  color: string;
};

const Color: FC<ColorProps> = ({ color }) => {
  return (
    <div
      className={css`
        background: ${color};
        width: 40px;
        height: 20px;
        border-radius: 20px;
      `}
    ></div>
  );
};

export default Color;
