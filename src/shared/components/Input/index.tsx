import { ChangeEvent, FC } from 'react';
//styles
import { ComponentWrapper, InputDefault, Label } from 'shared/styles';

type InputProps = {
  value: string;
  id: string;
  onChange: (value: string) => void;
  placeholder?: string;
  title?: string;
};

const Input: FC<InputProps> = ({ title, value, id, placeholder, onChange }) => {
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onChange(value);
  };

  return (
    <ComponentWrapper>
      <Label htmlFor={id}>{title}</Label>
      <InputDefault id={id} value={value} onChange={changeHandler} placeholder={placeholder} />
    </ComponentWrapper>
  );
};

export default Input;
