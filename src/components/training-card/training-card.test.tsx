import { render , screen } from '@testing-library/react';
import TrainingCardComponent from './training-card.component';
import { withStore } from '../../mocks/mock-component';
import { makeFakeStore } from '../../mocks/make-fake-store';

describe('Component: TrainingCardComponent', () => {
  const expectedTestId = 'trainingCard';
  it('should render correctly', () => {
    const fakeStore = makeFakeStore();
    const fakeTraining = fakeStore.training.training;
    const fakeUser = fakeStore.user.user;
    if (!fakeTraining || !fakeUser) {
      return;
    }
    const fakeProps = {
      training: fakeTraining,
      trainer: fakeUser,
      isTrainer: true,
      handleBuyButtonClick: () => undefined,
    };
    const { withStoreComponent } = withStore(<TrainingCardComponent {...fakeProps}/>, fakeStore);
    render(withStoreComponent);
    const expectedElement = screen.getByTestId(expectedTestId);
    expect(expectedElement).toBeInTheDocument();
  });
});
