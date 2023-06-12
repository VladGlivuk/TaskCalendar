import { FC, useState } from 'react';
//context
import { FilterContext, FilterContextProps } from './FilterContext';
//hooks
import { useDebounceValue } from 'core/hooks';
//types
import { FilterOption } from 'core/types';
//constants
import { LABEL } from 'core/constants';
//components
import Header from './Header';
import Content from './Content';
//styles
import { CalendarWrapper } from './styles';

const Calendar: FC = () => {
  const [filterOption, setFilterOption] = useState<FilterOption>(LABEL);
  const [filterValue, setFilterValue] = useState('');
  const debouncedFilterValue = useDebounceValue(filterValue, 1000);

  const onFilterOptionChange = (newOption: FilterOption) => setFilterOption(newOption);
  const onFilterValueChange = (newValue: string) => setFilterValue(newValue);

  const filterValueContext: FilterContextProps = {
    filterOption,
    filterValue,
    debouncedFilterValue,
    onFilterOptionChange,
    onFilterValueChange,
  };

  return (
    <FilterContext.Provider value={filterValueContext}>
      <CalendarWrapper>
        <Header></Header>
        <Content></Content>
      </CalendarWrapper>
    </FilterContext.Provider>
  );
};

export default Calendar;
