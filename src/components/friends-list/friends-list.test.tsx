import { render , screen } from '@testing-library/react';
import FriendsListComponent from './friends-list.component';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makeFakeStore } from '../../mocks/make-fake-store';
import { MemoryHistory, createMemoryHistory } from 'history';

describe('Component: FriendsListComponent', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render correctly with some friends existing', () => {
    const expectedListItemTestId = 'friendItem';
    const expectedShowMoreTestId = 'showMore';
    const fakeStore = makeFakeStore();
    const fakeUser = fakeStore.user.user;
    if (!fakeUser) {
      return;
    }
    const withHistoryComponent = withHistory(<FriendsListComponent user={fakeUser} />, mockHistory);
    const { withStoreComponent} = withStore(withHistoryComponent, fakeStore);
    render(withStoreComponent);
    const showMoreElements = screen.getAllByTestId(expectedListItemTestId);
    const listItemElement = screen.getByTestId(expectedShowMoreTestId);
    expect(showMoreElements.length).toEqual(fakeStore.user.userFriends.length);
    expect(listItemElement).toBeInTheDocument();
  });

  it('should render correctly with no friends existing', () => {
    const expectedNoFriendsTestId = 'noFriends';
    const fakeStore = makeFakeStore();
    const fakeUser = fakeStore.user.user;
    if (!fakeUser) {
      return;
    }
    fakeStore.user.userFriends = [];
    const withHistoryComponent = withHistory(<FriendsListComponent user={fakeUser} />, mockHistory);
    const { withStoreComponent} = withStore(withHistoryComponent, fakeStore);
    render(withStoreComponent);
    const noFriendsElement = screen.getByTestId(expectedNoFriendsTestId);
    expect(noFriendsElement).toBeInTheDocument();
  });
});
