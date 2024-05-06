import { render , screen } from '@testing-library/react';
import UserItemComponent from './user-item.component';
import { Location, TrainType, UserRole} from '../../const';
import { createMemoryHistory } from 'history';
import { withHistory } from '../../mocks/mock-component';

describe('Component: UserItemComponent', () => {
  const expectedTestId = 'userItem';
  it('should render correctly', () => {
    const EMPTY_STRING = '';
    const fakeProps = {
      location: Location.Petrogradskaya,
      name: EMPTY_STRING,
      trainType: [TrainType.Aerobics],
      role: UserRole.Trainer,
      avatar: EMPTY_STRING,
      id: EMPTY_STRING,
    };
    const mockHistory = createMemoryHistory();
    const withHistoryComponent = withHistory(<UserItemComponent {...fakeProps}/>, mockHistory);
    render(withHistoryComponent);
    const expectedElement = screen.getByTestId(expectedTestId);
    expect(expectedElement).toBeInTheDocument();
  });
});
