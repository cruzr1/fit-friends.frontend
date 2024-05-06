import { render } from '@testing-library/react';
import UserCardPage from './user-card.page';
import { makeFakeStore } from '../../mocks/make-fake-store';
import { withHistory, withStore } from '../../mocks/mock-component';
import { createMemoryHistory } from 'history';

describe('Component: UserCardPage', () => {
  it('should render correctly', () => {
    const fakeStore = makeFakeStore();
    const { withStoreComponent } = withStore(<UserCardPage />, fakeStore);
    const mockhistory = createMemoryHistory();
    const withHistoryComponent = withHistory(withStoreComponent, mockhistory);
    const {container} = render(withHistoryComponent);
    expect(container).not.toBeNull();
  });
});
