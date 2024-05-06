import { render , screen } from '@testing-library/react';
import ReviewItemComponent from './review-item.component';
import { NULL_VALUE} from '../../const';

describe('Component: ReviewItemComponent', () => {
  const expectedTestId = 'review';
  it('should render correctly', () => {
    const EMPTY_STRING = '';
    const fakeProps = {
      name: EMPTY_STRING,
      comment: EMPTY_STRING,
      avatar: EMPTY_STRING,
      rating: NULL_VALUE,
    };
    render(<ReviewItemComponent {...fakeProps}/>);
    const expectedElement = screen.getByTestId(expectedTestId);
    expect(expectedElement).toBeInTheDocument();
  });
});
