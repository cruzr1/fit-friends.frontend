import { ErrorStateType, error, setError } from './error.slice';

describe('Training Slice', () => {
  const initialState: ErrorStateType = {
    error: null,
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = error.reducer(initialState, emptyAction);

    expect(result).toEqual({...initialState});
  });

  it('should return initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const result = error.reducer(undefined, emptyAction);

    expect(result).toEqual({...initialState});
  });

  it('should set error with "setError" action', () => {
    const mockError = 'Mock Error message';
    const expectedState = {
      ...initialState,
      error: mockError,
    };
    const result = error.reducer(initialState, setError(mockError));
    expect(result).toEqual(expectedState);
  });
});
