import { render , screen } from '@testing-library/react';
import MainPage from './main.page';
import { makeFakeStore } from '../../mocks/make-fake-store';
import { withHistory, withStore } from '../../mocks/mock-component';
import { createMemoryHistory } from 'history';

describe('Component: MainPage', () => {
  const expectedText = 'FitFriends — Время находить тренировки, спортзалы и друзей спортсменов';
  it('should render correctly', () => {
    const fakeStore = makeFakeStore();
    const { withStoreComponent } = withStore(<MainPage />, fakeStore);
    const mockHistory = createMemoryHistory();
    const withHistoryComponent = withHistory(withStoreComponent, mockHistory);
    render(withHistoryComponent);
    const expectedElement = screen.getByText(expectedText);
    expect(expectedElement).toBeInTheDocument();
  });
});
