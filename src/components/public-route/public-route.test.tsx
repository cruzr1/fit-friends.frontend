import { render , screen } from '@testing-library/react';
import PublicRoute from './public-route';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makeFakeStore } from '../../mocks/make-fake-store';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AuthStatus } from '../../const';

describe('Component: PublicRoute', () => {
  const componentText = 'expectedText';
  const loadingTestId = 'loading';
  let mockHistory: MemoryHistory;

  const MockComponent = () => <div>{componentText}</div>;
  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render children component when user is not authorised', () => {
    const fakeStore = makeFakeStore();
    fakeStore.user.authStatus = AuthStatus.NoAuth;
    const withHistoryComponent = withHistory(
      <PublicRoute>
        <MockComponent />
      </PublicRoute>
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
      <PublicRoute>
        <MockComponent />
      </PublicRoute>
      , mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, fakeStore);
    render(withStoreComponent);
    const componentElement = screen.queryByText(componentText);
    const loadingElement = screen.getByTestId(loadingTestId);
    expect(componentElement).not.toBeInTheDocument();
    expect(loadingElement).toBeInTheDocument();
  });
});
