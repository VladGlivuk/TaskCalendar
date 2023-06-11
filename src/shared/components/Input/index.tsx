import { ChangeEvent, FC } from 'react';
//styles
import { ComponentWrapper, InputDefault, Label } from 'shared/styles';

type InputProps = {
  title: string;
  value: string;
  onChange: (value: string) => void;
  id: string;
};

const Input: FC<InputProps> = ({ title, value, id, onChange }) => {
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onChange(value);
  };

  return (
    <ComponentWrapper>
      <Label htmlFor={id}>{title}</Label>
      <InputDefault id={id} value={value} onChange={changeHandler} />
    </ComponentWrapper>
  );
};

export default Input;
