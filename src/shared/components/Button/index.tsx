import { FC } from 'react';
//types
import { BUTTON_TYPE } from 'core/types';
//styles
import { ButtonWrapper } from 'shared/styles';

type ButtonProps = {
  title: string;
  type: BUTTON_TYPE;
  clickHandler: () => void;
  isSmall?: boolean;
  disabled?: boolean;
};

const Button: FC<ButtonProps> = ({ type, title, clickHandler, disabled, isSmall }) => {
  return (
    <ButtonWrapper type={type} disabled={disabled} onClick={clickHandler} isSmall={isSmall}>
      {title}
    </ButtonWrapper>
  );
};

export default Button;
