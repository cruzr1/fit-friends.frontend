import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { redirect } from './redirect';
import { StateType } from '../../types';
import { AnyAction } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history';
import { redirectToRoute } from '../action';
import { AppRoute } from '../../const';

vi.mock('../../browser-history', () => ({
  default: {
    location: { pathname: ''},
    push(path: string) {
      this.location.pathname = path;
    }
  }
}));

describe('Middleware: Redirect', () => {
  let store: MockStore;

  beforeAll(() => {
    const middleware = [redirect];
    const mockStoreCreator = configureMockStore<StateType, AnyAction>(middleware);
    store = mockStoreCreator();
  });

  beforeEach(() => {
    browserHistory.push('');
  });

  it ('should redirect to "/signin" with redirectToRoute action', () => {
    const redirectAction = redirectToRoute(AppRoute.Signin);
    store.dispatch(redirectAction);
    expect(browserHistory.location.pathname).toBe(AppRoute.Signin);
  });

  it ('should not redirect to "/" with redirectToRoute action', () => {
    const emptyAction = {type: '', payload: AppRoute.Index};
    store.dispatch(emptyAction);
    expect(browserHistory.location.pathname).not.toBe(AppRoute.Main);
  });
});

