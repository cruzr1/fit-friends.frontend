import { render , screen } from '@testing-library/react';
import UsersCataloguePage from './users-catalog.page';
import { makeFakeStore } from '../../mocks/make-fake-store';
import { withHistory, withStore } from '../../mocks/mock-component';
import { createMemoryHistory } from 'history';

describe('Component: UsersCataloguePage', () => {
  const expectedTestId = 'wrapper';
  it('should render correctly', () => {
    const fakeStore = makeFakeStore();
    const { withStoreComponent } = withStore(<UsersCataloguePage />, fakeStore);
    const mockHistory = createMemoryHistory();
    const withHistoryComponent = withHistory(withStoreComponent, mockHistory);
    render(withHistoryComponent);
    const expectedElement = screen.getByTestId(expectedTestId);
    expect(expectedElement).toBeInTheDocument();
  });
});
