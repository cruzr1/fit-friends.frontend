import { render , screen } from '@testing-library/react';
import PrivateRoute from './private-route';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makeFakeStore } from '../../mocks/make-fake-store';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AuthStatus } from '../../const';

describe('Component: PrivateRoute', () => {
  const componentText = 'expectedTest';
  const loadingTestId = 'loading';
  let mockHistory: MemoryHistory;

  const MockComponent = () => <div>{componentText}</div>;
  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render children component when user is authorised', () => {
    const fakeStore = makeFakeStore();
    const withHistoryComponent = withHistory(
      <PrivateRoute>
        <MockComponent />
      </PrivateRoute>
      , mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, fakeStore);
    render(withStoreComponent);
    const expectedElement = screen.getByText(componentText);
    const loadingElement = screen.queryByTestId(loadingTestId);
    expect(expectedElement).toBeInTheDocument();
    expect(loadingElement).not.toBeInTheDocument();
  });

  it('should render loader when user is authorizing', () => {
    const fakeStore = makeFakeStore();
    fakeStore.user.authStatus = AuthStatus.Unknown;
    const withHistoryComponent = withHistory(
      <PrivateRoute>
        <MockComponent />
      </PrivateRoute>
      , mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, fakeStore);
    render(withStoreComponent);
    const componentElement = screen.queryByText(componentText);
    const loadingElement = screen.getByTestId(loadingTestId);
    expect(componentElement).not.toBeInTheDocument();
    expect(loadingElement).toBeInTheDocument();
  });
});
