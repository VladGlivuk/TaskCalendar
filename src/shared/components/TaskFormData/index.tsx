import { FC, useState } from 'react';
//emotion
import { css } from '@emotion/css';
//types
import { Task } from 'core/types';
//constants
import { possibleTaskColors } from 'core/constants';
//helpers
import { getIsFormValid, getNewTaskValue } from './helpers';
//components
import Input from '../Input';
import MultiSelect from '../Multiselect';
//styles
import { ButtonClose, SubmitButton } from 'shared/styles/buttons';

type TaskFormDataProps = {
  task: Task;
  submitHandler: (task: Task) => void;
  closeModalClickHandler: () => void;
  isEditing?: boolean;
};

const TaskFormData: FC<TaskFormDataProps> = ({ task, submitHandler, closeModalClickHandler, isEditing = false }) => {
  const [newTaskValue, setNewTaskValue] = useState<Task>(task);

  const onChangeLabelValue = (newLabelValue: string) => setNewTaskValue((task) => ({ ...task, label: newLabelValue }));

  const onChangeColorValue = (newColorValue: string) => setNewTaskValue((task) => ({ ...task, colors: [...task.colors, newColorValue] }));

  const onDeleteColorValue = (deleteValue: string) => setNewTaskValue((task) => ({ ...task, colors: task.colors.filter((color) => color !== deleteValue) }));

  const submitClickHandler = () => {
    const newTask = getNewTaskValue(newTaskValue, isEditing);
    const isValid = getIsFormValid(newTask);
    if (isValid) submitHandler(newTask);
  };

  return (
    <div>
      <div
        className={css`
          display: flex;
          flex-direction: column;
          row-gap: 8px;
        `}
      >
        <Input title='Enter the label of task *' id='createTaskInput' value={newTaskValue.label} onChange={onChangeLabelValue} />
        <MultiSelect
          options={possibleTaskColors}
          label={'Pick a color (optional)'}
          values={newTaskValue.colors}
          onChange={onChangeColorValue}
          onDeleteHandler={onDeleteColorValue}
        />
      </div>

      <div
        className={css`
          display: flex;
          flex-direction: row;
          column-gap: 12px;
        `}
      >
        <SubmitButton onClick={submitClickHandler}>Submit</SubmitButton>
        <ButtonClose onClick={closeModalClickHandler}>Close</ButtonClose>
      </div>
    </div>
  );
};

export default TaskFormData;
