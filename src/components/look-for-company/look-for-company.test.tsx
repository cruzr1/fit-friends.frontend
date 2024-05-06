import { render , screen } from '@testing-library/react';
import LookForCompanyComponent from './look-for-company.component';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makeFakeStore } from '../../mocks/make-fake-store';
import { createMemoryHistory } from 'history';

describe('Component: LookForCompanyComponent', () => {
  const expectedTestId = 'lookForCompany';
  it('should render correctly', () => {
    const fakeStore = makeFakeStore();
    const mockHistory = createMemoryHistory();
    const withHistoryComponent = withHistory(<LookForCompanyComponent />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, fakeStore);
    render(withStoreComponent);
    const expectedElement = screen.getByTestId(expectedTestId);
    expect(expectedElement).toBeInTheDocument();
  });
});
