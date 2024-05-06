import { render , screen } from '@testing-library/react';
import FriendsListPage from './friends-list.page';
import { makeFakeStore } from '../../mocks/make-fake-store';
import { withHistory, withStore } from '../../mocks/mock-component';
import { createMemoryHistory } from 'history';

describe('Component: FriendsListPage', () => {
  const expectedTestId = 'friendsList';
  it('should render correctly', () => {
    const fakeStore = makeFakeStore();
    const { withStoreComponent } = withStore(<FriendsListPage />, fakeStore);
    const mockHistory = createMemoryHistory();
    const withHistoryComponent = withHistory(withStoreComponent, mockHistory);
    render(withHistoryComponent);
    const expectedElement = screen.getByTestId(expectedTestId);
    expect(expectedElement).toBeInTheDocument();
  });
});
