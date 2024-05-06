import { render , screen } from '@testing-library/react';
import PopupSigninComponent from './popup-signin.component';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makeFakeStore } from '../../mocks/make-fake-store';
import { createMemoryHistory } from 'history';

describe('Component: PopupSigninComponent', () => {
  const expectedTestId = 'popup';
  it('should render correctly', () => {
    const fakeStore = makeFakeStore();
    const mockHistory = createMemoryHistory();
    const withHistoryComponent = withHistory(<PopupSigninComponent />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, fakeStore);
    render(withStoreComponent);
    const expectedElement = screen.getByTestId(expectedTestId);
    expect(expectedElement).toBeInTheDocument();
  });
});
