import { render , screen } from '@testing-library/react';
import LoadingPage from './loading.page';
import { withHistory } from '../../mocks/mock-component';
import { createMemoryHistory } from 'history';

describe('Component: LoadingPage', () => {
  const expectedTestId = 'loading';
  it('should render correctly', () => {
    const mockHistory = createMemoryHistory();
    const withHistoryComponent = withHistory(<LoadingPage />, mockHistory);
    render(withHistoryComponent);
    const expectedElement = screen.getByTestId(expectedTestId);
    expect(expectedElement).toBeInTheDocument();
  });
});
