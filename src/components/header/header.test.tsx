import { render , screen } from '@testing-library/react';
import HeaderComponent from './header.component';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makeFakeStore } from '../../mocks/make-fake-store';
import { createMemoryHistory } from 'history';

describe('Component: HeaderComponent', () => {
  const expectedHeaderTestId = 'header';
  it('should render correctly', () => {
    const fakeStore = makeFakeStore();
    const mockHistory = createMemoryHistory();
    const withHistoryComponent = withHistory(<HeaderComponent />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, fakeStore);
    render(withStoreComponent);
    const headerElement = screen.getByTestId(expectedHeaderTestId);
    expect(headerElement).toBeInTheDocument();
  });
});
