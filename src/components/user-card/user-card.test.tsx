import { render , screen } from '@testing-library/react';
import UserCardComponent from './user-card.component';
import { makeFakeStore } from '../../mocks/make-fake-store';
import { withHistory, withStore } from '../../mocks/mock-component';
import { RequestStatus } from '../../const';
import { createMemoryHistory } from 'history';

describe('Component: UserCardComponent', () => {
  const expectedTestId = 'card';
  it('should render correctly', () => {
    const EMPTY_STRING = '';
    const fakeStore = makeFakeStore();
    fakeStore.user.loadUserItemTrainingsStatus = RequestStatus.Fulfilled;
    const mockHistory = createMemoryHistory();
    const withHistoryComponent = withHistory(<UserCardComponent userId={EMPTY_STRING} />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, fakeStore);
    render(withStoreComponent);
    const expectedElement = screen.getByTestId(expectedTestId);
    expect(expectedElement).toBeInTheDocument();
  });
});
