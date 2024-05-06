import { render , screen } from '@testing-library/react';
import CreateTrainingPage from './create-training.page';
import { makeFakeStore } from '../../mocks/make-fake-store';
import { withHistory, withStore } from '../../mocks/mock-component';
import { createMemoryHistory } from 'history';

describe('Component: CreateTrainingPage', () => {
  const expectedTestId = 'createTraining';
  it('should render correctly', () => {
    const fakeStore = makeFakeStore();
    const mockHistory = createMemoryHistory();
    const withHistoryComponent = withHistory(<CreateTrainingPage />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, fakeStore);
    render(withStoreComponent);
    const expectedElement = screen.getByTestId(expectedTestId);
    expect(expectedElement).toBeInTheDocument();
  });
});
