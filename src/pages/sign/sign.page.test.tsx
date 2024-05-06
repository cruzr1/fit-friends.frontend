import { render , screen } from '@testing-library/react';
import SignPage from './sign.page';
import { makeFakeStore } from '../../mocks/make-fake-store';
import { withHistory, withStore } from '../../mocks/mock-component';
import { createMemoryHistory } from 'history';

describe('Component: SignPage', () => {

  it('should render correctly for signin action', () => {
    const expectedTestId = 'signin';
    const fakeStore = makeFakeStore();
    const { withStoreComponent } = withStore(<SignPage isSignin />, fakeStore);
    const mockHistory = createMemoryHistory();
    const withHistoryComponent = withHistory(withStoreComponent, mockHistory);
    render(withHistoryComponent);
    const expectedElement = screen.getByTestId(expectedTestId);
    expect(expectedElement).toBeInTheDocument();
  });

  it('should render correctly for signup action', () => {
    const expectedTestId = 'signup';
    const fakeStore = makeFakeStore();
    const { withStoreComponent } = withStore(<SignPage />, fakeStore);
    const mockHistory = createMemoryHistory();
    const withHistoryComponent = withHistory(withStoreComponent, mockHistory);
    render(withHistoryComponent);
    const expectedElement = screen.getByTestId(expectedTestId);
    expect(expectedElement).toBeInTheDocument();
  });
});
