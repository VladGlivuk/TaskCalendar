import { FC, useState } from 'react';
import html2canvas from 'html2canvas';
import saveAs from 'file-saver';
//context
import { WrapperContext, WrapperContextProps } from './WrapperContext';
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

  const debouncedFilterValue = useDebounceValue(filterValue, 300);

  const onFilterOptionChange = (newOption: FilterOption) => setFilterOption(newOption);
  const onFilterValueChange = (newValue: string) => setFilterValue(newValue);

  const downloadElementAsImage = (elementId: string, fileName: string) => {
    const targetElement = document.getElementById(elementId);

    if (targetElement) {
      html2canvas(targetElement).then((canvas) => {
        const dataURL = canvas.toDataURL();
        saveAs(dataURL, fileName);
      });
    }
  };

  const wrapperValueContext: WrapperContextProps = {
    filterOption,
    filterValue,
    debouncedFilterValue,
    onFilterOptionChange,
    onFilterValueChange,
    downloadElementAsImage,
  };

  return (
    <WrapperContext.Provider value={wrapperValueContext}>
      <CalendarWrapper>
        <Header></Header>
        <Content></Content>
      </CalendarWrapper>
    </WrapperContext.Provider>
  );
};

export default Calendar;
