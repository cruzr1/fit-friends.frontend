import { render , screen } from '@testing-library/react';
import PopupReviewComponent from './popup-review.component';
import { withStore } from '../../mocks/mock-component';
import { makeFakeStore } from '../../mocks/make-fake-store';

describe('Component: PopupReviewComponent', () => {
  const expectedTestId = 'popup';
  it('should render correctly', () => {
    const fakeStore = makeFakeStore();
    const fakeTrainingId = fakeStore.training.training?.id;
    if (!fakeTrainingId) {
      return;
    }
    const fakeCb = () => undefined;
    const {withStoreComponent} = withStore(
      <PopupReviewComponent
        trainingId={fakeTrainingId}
        handlePopupClose={fakeCb}
      />, fakeStore
    );
    render(withStoreComponent);
    const expectedElement = screen.getByTestId(expectedTestId);
    expect(expectedElement).toBeInTheDocument();
  });
});
