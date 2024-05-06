import { render , screen } from '@testing-library/react';
import PopupQuestionnaireComponent from './popup-questionnaire.component';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makeFakeStore } from '../../mocks/make-fake-store';
import { createMemoryHistory } from 'history';

describe('Component: PopupQuestionnaireComponent', () => {
  const expectedTestId = 'popup';
  it('should render correctly', () => {
    const fakeStore = makeFakeStore();
    const mockHistory = createMemoryHistory();
    const withHistoryComponent = withHistory(<PopupQuestionnaireComponent />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, fakeStore
    );
    render(withStoreComponent);
    const expectedElement = screen.getByTestId(expectedTestId);
    expect(expectedElement).toBeInTheDocument();
  });
});
