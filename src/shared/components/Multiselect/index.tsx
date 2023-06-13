import { ChangeEvent, FC } from 'react';
//styles
import { ComponentWrapper, Label, MultiSelectDefault, MultiSelectDefaultOption } from 'shared/styles';

type MultiSelectProps = {
  label: string;
  values: Array<string>;
  options: Array<string>;
  onChange: (value: string) => void;
  onDeleteHandler: (value: string) => void;
};

const MultiSelect: FC<MultiSelectProps> = ({ options, label, onChange, onDeleteHandler, values }) => {
  const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    const isAlreadyExist = values.includes(value);

    if (isAlreadyExist) onDeleteHandler(value);
    else onChange(value);
  };

  return (
    <ComponentWrapper>
      <Label htmlFor={label}>{label}</Label>

      <MultiSelectDefault onChange={onChangeHandler} id={label} multiple value={values} size={3}>
        {options.map((option, index) => (
          <MultiSelectDefaultOption value={option} key={option + index}>
            {option}
          </MultiSelectDefaultOption>
        ))}
      </MultiSelectDefault>
    </ComponentWrapper>
  );
};

export default MultiSelect;
