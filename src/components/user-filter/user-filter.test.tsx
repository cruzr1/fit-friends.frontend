import { render , screen } from '@testing-library/react';
import UserFilterComponent from './user-filter.component';
import { makeFakeStore } from '../../mocks/make-fake-store';
import { withStore } from '../../mocks/mock-component';

describe('Component: UserFilterComponent', () => {
  const expectedTestId = 'filter';
  it('should render correctly', () => {
    const fakeStore = makeFakeStore();
    const { withStoreComponent } = withStore(<UserFilterComponent />, fakeStore);
    render(withStoreComponent);
    const expectedElement = screen.getByTestId(expectedTestId);
    expect(expectedElement).toBeInTheDocument();
  });
});
