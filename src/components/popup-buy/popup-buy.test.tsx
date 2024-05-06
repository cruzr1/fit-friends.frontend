import { render , screen } from '@testing-library/react';
import PopupBuyComponent from './popup-buy.component';
import { withStore } from '../../mocks/mock-component';
import { makeFakeStore } from '../../mocks/make-fake-store';

describe('Component: PopupBuyComponent', () => {
  const expectedTestId = 'popup';
  it('should render correctly', () => {
    const fakeStore = makeFakeStore();
    if (!fakeStore.training.training) {
      return;
    }
    const fakeTraining = fakeStore.training.training;
    const fakeCb = () => undefined;
    const {withStoreComponent} = withStore(<PopupBuyComponent training={fakeTraining} handlePopupClose={fakeCb}/>, fakeStore
    );
    render(withStoreComponent);
    const expectedElement = screen.getByTestId(expectedTestId);
    expect(expectedElement).toBeInTheDocument();
  });
});
