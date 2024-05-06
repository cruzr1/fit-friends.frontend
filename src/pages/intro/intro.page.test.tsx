import { render , screen } from '@testing-library/react';
import IntroPage from './intro.page';
import { withHistory } from '../../mocks/mock-component';
import { createMemoryHistory } from 'history';

describe('Component: IntroPage', () => {
  const expectedTestId = 'intro';
  it('should render correctly', () => {
    const mockHistory = createMemoryHistory();
    const withHistoryComponent = withHistory(<IntroPage />, mockHistory);
    render(withHistoryComponent);
    const expectedElement = screen.getByTestId(expectedTestId);
    expect(expectedElement).toBeInTheDocument();
  });
});
