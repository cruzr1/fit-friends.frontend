import { render , screen } from '@testing-library/react';
import TrainingFilterComponent from './training-filter.component';
import { withStore } from '../../mocks/mock-component';
import { makeFakeStore } from '../../mocks/make-fake-store';

describe('Component: TrainingFilterComponent', () => {
  const expectedTestId = 'filter';
  it('should render correctly', () => {
    const fakeStore = makeFakeStore();
    const { withStoreComponent } = withStore(<TrainingFilterComponent />, fakeStore);
    render(withStoreComponent);
    const expectedElement = screen.getByTestId(expectedTestId);
    expect(expectedElement).toBeInTheDocument();
  });
});
