import { render , screen } from '@testing-library/react';
import SpecialForYouComponent from './special-for-you.component';
import { makeFakeStore } from '../../mocks/make-fake-store';
import { withStore } from '../../mocks/mock-component';

describe('Component: SpecialForYouComponent', () => {
  const expectedTestId = 'special';
  it('should render correctly', () => {
    const fakeStore = makeFakeStore();
    const fakeUser = fakeStore.user.user;
    if (!fakeUser) {
      return;
    }
    const {withStoreComponent} = withStore(<SpecialForYouComponent user={fakeUser}/>, fakeStore);
    render(withStoreComponent);
    const expectedElement = screen.getByTestId(expectedTestId);
    expect(expectedElement).toBeInTheDocument();
  });
});
