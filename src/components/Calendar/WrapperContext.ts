import { createContext } from 'react';
//types
import { FilterOption } from 'core/types';

export type WrapperContextProps = {
  filterOption: FilterOption;
  filterValue: string;
  debouncedFilterValue: string | undefined;
  onFilterOptionChange: (value: FilterOption) => void;
  onFilterValueChange: (value: string) => void;
  downloadElementAsImage: (elementId: string, format: string) => void;
};

export const WrapperContext = createContext({} as WrapperContextProps);
