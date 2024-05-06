import { render , screen } from '@testing-library/react';
import LayoutComponent from './layout.component';
import { withHistory, withStore } from '../../mocks/mock-component';
import { createMemoryHistory } from 'history';
import { makeFakeStore } from '../../mocks/make-fake-store';

describe('Component: LayoutComponent', () => {
  const expectedTestId = 'layout';
  it('should render correctly', () => {
    const mockHistory = createMemoryHistory();
    const fakeStore = makeFakeStore();
    const withHistoryComponent = withHistory(<LayoutComponent />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, fakeStore);
    render(withStoreComponent);
    const layoutElement = screen.getByTestId(expectedTestId);
    expect(layoutElement).toBeInTheDocument();
  });
});
