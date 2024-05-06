import { render , screen } from '@testing-library/react';
import TrainingsListComponent from './trainings-list.component';
import { AppRoute, TrainingItemClassApply} from '../../const';
import { makeFakeStore } from '../../mocks/make-fake-store';
import { withStore } from '../../mocks/mock-component';

describe('Component: TrainingsListComponent', () => {
  const expectedTestId = 'list';
  it('should render correctly', () => {
    const fakeProps = {
      classApply: TrainingItemClassApply[AppRoute.MyOrders],
      shouldIncludeDuration: true,
      isOrdered: true,
    };
    const fakeStore = makeFakeStore();
    const { withStoreComponent } = withStore(<TrainingsListComponent {...fakeProps}/>, fakeStore);
    render(withStoreComponent);
    const expectedElement = screen.getByTestId(expectedTestId);
    expect(expectedElement).toBeInTheDocument();
  });
});
