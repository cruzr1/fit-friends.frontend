import { render , screen } from '@testing-library/react';
import PersonalAccountComponent from './personal-account.component';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makeFakeStore } from '../../mocks/make-fake-store';
import { createMemoryHistory } from 'history';

describe('Component: PersonalAccountComponent', () => {
  const expectedUserInfoTestId = 'userinfo';
  const expectedContentTestId = 'content';
  it('should render correctly', () => {
    const fakeStore = makeFakeStore();
    const mockHistory = createMemoryHistory();
    if (!fakeStore.user.user) {
      return;
    }
    const fakeComponentProps = {
      user: fakeStore.user.user,
    };
    const withHistoryComponent = withHistory(<PersonalAccountComponent {...fakeComponentProps}/>, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, fakeStore
    );
    render(withStoreComponent);
    const expectedUserInfoElement = screen.getByTestId(expectedUserInfoTestId);
    const expectedContentElement = screen.getByTestId(expectedContentTestId);
    expect(expectedUserInfoElement).toBeInTheDocument();
    expect(expectedContentElement).toBeInTheDocument();
  });
});
