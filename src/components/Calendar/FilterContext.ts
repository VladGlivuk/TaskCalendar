import { createContext } from 'react';
//types
import { FilterOption } from 'core/types';

export type FilterContextProps = {
  filterOption: FilterOption;
  filterValue: string;
  debouncedFilterValue: string | undefined;
  onFilterOptionChange: (value: FilterOption) => void;
  onFilterValueChange: (value: string) => void;
};

export const FilterContext = createContext({} as FilterContextProps);
