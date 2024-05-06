import { render , screen } from '@testing-library/react';
import SpecialOffersComponent from './special-offers.component';
import { withStore } from '../../mocks/mock-component';
import { makeFakeStore } from '../../mocks/make-fake-store';


describe('Component: SpecialOffersComponent', () => {
  const expectedTestId = 'special';
  it('should render correctly', () => {
    const fakeStore = makeFakeStore();
    const {withStoreComponent} = withStore(<SpecialOffersComponent />, fakeStore);
    render(withStoreComponent);
    const expectedElement = screen.getByTestId(expectedTestId);
    expect(expectedElement).toBeInTheDocument();
  });
});
