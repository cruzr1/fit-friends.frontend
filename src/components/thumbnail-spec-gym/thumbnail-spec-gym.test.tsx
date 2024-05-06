import { render , screen } from '@testing-library/react';
import ThumbnailSpecGymComponent from './thumbnail-spec-gym.component';

describe('Component: ThumbnailSpecGymComponent', () => {
  const expectedTestId = 'thumbnail';
  it('should render correctly', () => {
    render(<ThumbnailSpecGymComponent />);
    const expectedElement = screen.getByTestId(expectedTestId);
    expect(expectedElement).toBeInTheDocument();
  });
});
