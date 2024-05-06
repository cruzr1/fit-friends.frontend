import { StateName } from '../../const';
import { selectError } from './error.selectors';

const ERROR_MESSAGE = 'Error message';

describe('Error selectors', () => {
  const state = {
    [StateName.Error]: {
      error: ERROR_MESSAGE,
    }
  };

  it('should return error message from state', () => {
    const {error} = state[StateName.Error];
    const result = selectError(state);
    expect(result).toBe(error);
  });
});
