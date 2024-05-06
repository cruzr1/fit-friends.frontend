import { render , screen } from '@testing-library/react';
import UsersListComponent from './users-list.component';
import { AppRoute, TrainingItemClassApply} from '../../const';
import { makeFakeStore } from '../../mocks/make-fake-store';
import { withStore } from '../../mocks/mock-component';

describe('Component: UsersListComponent', () => {
  const expectedTestId = 'usersList';
  it('should render correctly', () => {
    const fakeStore = makeFakeStore();
    const { withStoreComponent } = withStore(<UsersListComponent classApply={TrainingItemClassApply[AppRoute.MyOrders]} />, fakeStore);
    render(withStoreComponent);
    const expectedElement = screen.getByTestId(expectedTestId);
    expect(expectedElement).toBeInTheDocument();
  });
});
