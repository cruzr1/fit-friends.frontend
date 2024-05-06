import { render , screen } from '@testing-library/react';
import FriendsListItemComponent from './friends-list-item.component';
import { withStore } from '../../mocks/mock-component';
import { makeFakeStore } from '../../mocks/make-fake-store';
import { ApplicationStatus, NULL_VALUE, UserRole } from '../../const';

describe('Component: FriendsListItemComponent', () => {
  it('should render correctly', () => {
    const expectedFriendTestId = 'friend';

    const fakeStore = makeFakeStore();
    const fakeUser = fakeStore.user.user;
    if (!fakeUser) {
      return;
    }
    const fakeApplication = {
      id: NULL_VALUE.toString(),
      authorId: fakeUser.id,
      userId: fakeUser.id,
      status: ApplicationStatus.Reviewing,
      updatedAt: new Date(),
    };
    const fakeFriendsListItemProps = {
      name: fakeUser.name,
      location: fakeUser.location,
      trainType: fakeUser.trainType,
      isReadyTrain: fakeUser.isReadyTrain,
      role: fakeUser.role,
      userRole: UserRole.User,
      application: fakeApplication,
      userId: fakeUser.id,
    };
    const { withStoreComponent} = withStore(<FriendsListItemComponent {...fakeFriendsListItemProps}/>, fakeStore);
    render(withStoreComponent);
    const friendElement = screen.getByTestId(expectedFriendTestId);
    expect(friendElement).toBeInTheDocument();
  });
});
