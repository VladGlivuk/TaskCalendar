//constants
import { maxTasksInDay } from 'core/constants';

export const getCardsAmountInfo = (allTasksLength: number): string => `${allTasksLength}/${maxTasksInDay} ${allTasksLength === 1 ? 'card' : 'cards'}`;
