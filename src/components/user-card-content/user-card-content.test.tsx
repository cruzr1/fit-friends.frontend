import { render , screen } from '@testing-library/react';
import UserCardContentComponent from './user-card-content.component';
import { TrainType} from '../../const';
import { makeFakeStore } from '../../mocks/make-fake-store';
import { withStore } from '../../mocks/mock-component';

describe('Component: UserCardContentComponent', () => {
  const expectedTestId = 'userCard';
  it('should render correctly', () => {
    const EMPTY_STRING = '';
    const fakeProps = {
      classApply: EMPTY_STRING,
      name: EMPTY_STRING,
      location: EMPTY_STRING,
      isCoach: true,
      description: EMPTY_STRING,
      trainType: [TrainType.Aerobics],
      id: EMPTY_STRING,
      isReadyTrain: true,
      handleShowCertificatesButtonClick: () => undefined,
      handleMapLinkClick: () => undefined,
    };
    const fakeStore = makeFakeStore();
    const { withStoreComponent } = withStore(<UserCardContentComponent {...fakeProps}/>, fakeStore);
    render(withStoreComponent);
    const expectedElement = screen.getByTestId(expectedTestId);
    expect(expectedElement).toBeInTheDocument();
  });
});
