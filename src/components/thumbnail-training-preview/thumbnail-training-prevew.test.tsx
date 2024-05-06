import { render , screen } from '@testing-library/react';
import ThumbnailTrainingPreviewComponent from './thumbnail-training-prevew.component';
import { TrainType} from '../../const';
import { createMemoryHistory } from 'history';
import { withHistory } from '../../mocks/mock-component';

describe('Component: ThumbnailTrainingPreviewComponent', () => {
  const expectedTestId = 'preview';
  it('should render correctly', () => {
    const EMPTY_STRING = '';
    const fakeProps = {
      id: EMPTY_STRING,
      trainType: TrainType.Aerobics,
    };
    const mockHistory = createMemoryHistory();
    const withHistoryComponent = withHistory(<ThumbnailTrainingPreviewComponent {...fakeProps}/>, mockHistory);
    render(withHistoryComponent);
    const expectedElement = screen.getByTestId(expectedTestId);
    expect(expectedElement).toBeInTheDocument();
  });
});
