import { render , screen } from '@testing-library/react';
import TrainingItemComponent from './training-item.component';
import { NULL_VALUE} from '../../const';
import { withHistory } from '../../mocks/mock-component';
import { createMemoryHistory } from 'history';

describe('Component: TrainingItemComponent', () => {
  const expectedTestId = 'item';
  it('should render correctly', () => {
    const EMPTY_STRING = '';
    const fakeProps = {
      id: EMPTY_STRING,
      price: NULL_VALUE,
      name: EMPTY_STRING,
      trainType: EMPTY_STRING,
      calories: NULL_VALUE,
      description: EMPTY_STRING,
      rating: NULL_VALUE,
      backgroundImage: EMPTY_STRING,
      isOrdered: true,
      trainingsCount: NULL_VALUE,
      trainingsSum: NULL_VALUE,
    };
    const mockHistory = createMemoryHistory();
    const withHistoryComponent = withHistory(<TrainingItemComponent {...fakeProps}/>, mockHistory);
    render(withHistoryComponent);
    const expectedElement = screen.getByTestId(expectedTestId);
    expect(expectedElement).toBeInTheDocument();
  });
});
