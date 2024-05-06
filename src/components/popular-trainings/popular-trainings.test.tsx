import { render , screen } from '@testing-library/react';
import PopularTrainingsComponent from './popular-trainings.component';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makeFakeStore } from '../../mocks/make-fake-store';
import { createMemoryHistory } from 'history';

describe('Component: PopularTrainingsComponent', () => {
  const expectedTestId = 'popularTrainings';
  it('should render correctly', () => {
    const fakeStore = makeFakeStore();
    const mockHistory = createMemoryHistory();
    const withHistoryComponent = withHistory(<PopularTrainingsComponent />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, fakeStore
    );
    render(withStoreComponent);
    const expectedElement = screen.getByTestId(expectedTestId);
    expect(expectedElement).toBeInTheDocument();
  });
});
