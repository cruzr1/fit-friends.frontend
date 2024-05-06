import { render , screen } from '@testing-library/react';
import QuestionnairePage from './questionnaire.page';
import { makeFakeStore } from '../../mocks/make-fake-store';
import { withHistory, withStore } from '../../mocks/mock-component';
import { createMemoryHistory } from 'history';

describe('Component: QuestionnairePage', () => {
  const expectedTestId = 'popup';
  it('should render correctly', () => {
    const fakeStore = makeFakeStore();
    const { withStoreComponent } = withStore(<QuestionnairePage />, fakeStore);
    const mockHistory = createMemoryHistory();
    const withHistoryComponent = withHistory(withStoreComponent, mockHistory);
    render(withHistoryComponent);
    const expectedElement = screen.getByTestId(expectedTestId);
    expect(expectedElement).toBeInTheDocument();
  });
});
