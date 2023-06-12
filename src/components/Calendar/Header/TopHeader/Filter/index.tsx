import { FC, useContext } from 'react';
//context
import { FilterContext } from 'components/Calendar/FilterContext';
//types
import { FilterOption } from 'core/types';
//components
import { filterOptions } from 'core/constants';
//components
import Select from 'shared/components/Select';
import Input from 'shared/components/Input';
//styles
import { FilterWrapper } from './styles';

const Filter: FC = () => {
  const { filterValue, onFilterOptionChange, onFilterValueChange } = useContext(FilterContext);

  const onFilterOptionChangeHandler = (filterValue: string) => onFilterOptionChange(filterValue as FilterOption);

  const onFilterValueChangeHandler = (filterValue: string) => onFilterValueChange(filterValue);

  return (
    <FilterWrapper>
      <Select options={filterOptions} label='Filter by' onChange={onFilterOptionChangeHandler} />

      <Input value={filterValue} onChange={onFilterValueChangeHandler} placeholder='Enter you filter value' id='filterInput' />
    </FilterWrapper>
  );
};

export default Filter;
