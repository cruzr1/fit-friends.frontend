import { render , screen } from '@testing-library/react';
import ReviewsListComponent from './reviews-list.component';
import { makeFakeStore } from '../../mocks/make-fake-store';
import { withStore } from '../../mocks/mock-component';

describe('Component: ReviewsListComponent', () => {
  const expectedTestId = 'reviewsList';
  it('should render correctly', () => {
    const EMPTY_STRING = '';
    const fakeReviewsListComponentProps = {
      trainingId: EMPTY_STRING,
      isTrainer: true,
      handleReviewButtonClick: () => undefined,
    };
    const fakeStore = makeFakeStore();
    const {withStoreComponent} = withStore(<ReviewsListComponent {...fakeReviewsListComponentProps}/>, fakeStore);
    render(withStoreComponent);
    const expectedElement = screen.getByTestId(expectedTestId);
    expect(expectedElement).toBeInTheDocument();
  });
});
