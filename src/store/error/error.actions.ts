import { createAsyncThunk } from '@reduxjs/toolkit';
import { setError } from './error.slice';
import { Action, NameSpace, TIMEOUT_SHOW_ERROR } from '../../const';
import { AppDispatchType } from '../../types';

export const clearErrorAction = createAsyncThunk<void, string, {
  dispatch: AppDispatchType;
  }
>(
  `${NameSpace.Error}/${Action.Delete}`,
  (errorMessage, {dispatch}) => {
    dispatch(setError(errorMessage));
    setTimeout(
      () => dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);
