import { StateType } from '../../types';
import { StateName } from '../../const';

export const selectError = (state: Pick<StateType, StateName.Error>) => state[StateName.Error].error;
