import { ChangeEvent, FC } from 'react';
//styles
import {  Label, SelectOption, SelectStyles, SelectWrapper } from 'shared/styles';

type SelectProps = {
  options: Array<string>;
  label: string;
  onChange: (value: string) => void;
};

const Select: FC<SelectProps> = ({ options, label, onChange }) => {
  const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    onChange(value);
  };

  return (
    <SelectWrapper>
      <Label htmlFor={label}>{label}</Label>

      <SelectStyles onChange={onChangeHandler} id={label}>
        {options.map((option, index) => (
          <SelectOption value={option} key={option + index}>
            {option}
          </SelectOption>
        ))}
      </SelectStyles>
    </SelectWrapper>
  );
};

export default Select;
