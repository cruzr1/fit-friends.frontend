import { render , screen } from '@testing-library/react';
import PersonalAccountPage from './personal-account.page';
import { makeFakeStore } from '../../mocks/make-fake-store';
import { withHistory, withStore } from '../../mocks/mock-component';
import { createMemoryHistory } from 'history';

describe('Component: PersonalAccountPage', () => {
  const expectedUserInfoTestId = 'userinfo';
  const expectedContentTestId = 'content';
  it('should render correctly', () => {
    const fakeStore = makeFakeStore();
    const { withStoreComponent } = withStore(<PersonalAccountPage />, fakeStore);
    const mockHistory = createMemoryHistory();
    const withHistoryComponent = withHistory(withStoreComponent, mockHistory);
    render(withHistoryComponent);
    const expectedUserInfoElement = screen.getByTestId(expectedUserInfoTestId);
    const expectedContentElement = screen.getByTestId(expectedContentTestId);
    expect(expectedUserInfoElement).toBeInTheDocument();
    expect(expectedContentElement).toBeInTheDocument();
  });
});
