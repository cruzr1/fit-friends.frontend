import { render , screen } from '@testing-library/react';
import TrainingCardPage from './training-card.page';
import { makeFakeStore } from '../../mocks/make-fake-store';
import { withHistory, withStore } from '../../mocks/mock-component';
import { createMemoryHistory } from 'history';
import { RequestStatus } from '../../const';

describe('Component: TrainingCardPage', () => {
  const expectedTestId = 'wrapper';
  it('should render correctly', () => {
    const fakeStore = makeFakeStore();
    fakeStore.training.loadTrainingStatus = RequestStatus.Fulfilled;
    const { withStoreComponent } = withStore(<TrainingCardPage />, fakeStore);
    const mockHistory = createMemoryHistory();
    const withHistoryComponent = withHistory(withStoreComponent, mockHistory);
    render(withHistoryComponent);
    const expectedElement = screen.getByTestId(expectedTestId);
    expect(expectedElement).toBeInTheDocument();
  });
});
