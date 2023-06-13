import { FC, useState } from 'react';
//emotion
import { css } from '@emotion/css';
//types
import { BUTTON_TYPE, Task } from 'core/types';
//constants
import { possibleTaskColors } from 'core/constants';
//helpers
import { getIsFormValid, getNewFilteredTaskValue, getNewTaskValue, getTaskWithNewColor, getTaskWithNewLabel } from './helpers';
//components
import Input from '../Input';
import MultiSelect from '../Multiselect';
import Button from '../Button';

type TaskFormDataProps = {
  task: Task;
  submitHandler: (task: Task) => void;
  closeModalClickHandler: () => void;
  isEditing?: boolean;
};

const TaskFormData: FC<TaskFormDataProps> = ({ task, submitHandler, closeModalClickHandler, isEditing = false }) => {
  const [newTaskValue, setNewTaskValue] = useState<Task>(task);

  const onChangeLabelValue = (newLabelValue: string) => setNewTaskValue((task) => getTaskWithNewLabel(task, newLabelValue));

  const onChangeColorValue = (newColorValue: string) => setNewTaskValue((task) => getTaskWithNewColor(task, newColorValue));

  const onDeleteColorValue = (deleteValue: string) => setNewTaskValue((task) => getNewFilteredTaskValue(task, deleteValue));

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
          label={'Pick colors (optional)'}
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
        <Button type={BUTTON_TYPE.SUBMIT} title="Submit" clickHandler={submitClickHandler} />
        <Button type={BUTTON_TYPE.CLOSE} title="Close" clickHandler={closeModalClickHandler} />
      </div>
    </div>
  );
};

export default TaskFormData;
