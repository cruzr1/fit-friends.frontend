import { render , screen } from '@testing-library/react';
import ErrorPage from './error.page';
import { createMemoryHistory } from 'history';
import { withHistory } from '../../mocks/mock-component';

describe('Component: ErrorPage', () => {
  const expectedTestId = 'error';
  it('should render correctly', () => {
    const mockHistory = createMemoryHistory();
    const withHistoryComponent = withHistory(<ErrorPage />, mockHistory);
    render(withHistoryComponent);
    const expectedElement = screen.getByTestId(expectedTestId);
    expect(expectedElement).toBeInTheDocument();
  });
});
