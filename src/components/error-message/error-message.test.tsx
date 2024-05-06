import { render , screen } from '@testing-library/react';
import ErrorMessageComponent from './error-message.component';
import { withStore } from '../../mocks/mock-component';
import { makeFakeStore } from '../../mocks/make-fake-store';

describe('Component: ErrorMessageComponent', () => {
  it('should render correctly', () => {
    const expectedErrorTestId = 'error-message-text';
    const fakeStore = makeFakeStore();
    fakeStore.error.error = 'Has error';
    const { withStoreComponent} = withStore(<ErrorMessageComponent />, fakeStore);
    render(withStoreComponent);
    const errorElement = screen.getByTestId(expectedErrorTestId);
    expect(errorElement).toBeInTheDocument();
  });
});
