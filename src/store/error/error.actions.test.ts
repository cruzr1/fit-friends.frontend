import thunk from 'redux-thunk';
import { Action } from 'redux';
import { createApi } from '../../services/api';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppThunkDispatchType, StateType } from '../../types';
import { setError } from '../error/error.slice';
import { clearErrorAction } from '../error/error.actions';

describe('Async error actions', () => {
  const api = createApi();
  const middleware = [thunk.withExtraArgument(api)];
  const mockStoreCreator = configureMockStore<StateType, Action<string>, AppThunkDispatchType>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({});
  });

  describe('clearErrorAction', () => {
    const mockErrorMessage = 'Sample error message';
    it('should dispatch "clearErrorAction", "setError"', async () => {
      await store.dispatch(clearErrorAction(mockErrorMessage));
      const actions = store.getActions();
      const actionTypes = actions.map(({type}) => type);
      expect(actionTypes).toEqual([
        clearErrorAction.pending.type,
        setError.type,
        clearErrorAction.fulfilled.type,
      ]);
    });
  });
});
