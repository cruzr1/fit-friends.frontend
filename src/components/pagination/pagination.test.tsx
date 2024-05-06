import { render , screen } from '@testing-library/react';
import PaginationComponent from './pagination.component';
import { AppRoute, NULL_VALUE, TrainingItemClassApply } from '../../const';

describe('Component: PaginationComponent', () => {
  const expectedTestId = 'showMore';
  it('should render correctly', () => {
    const fakeCb = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => evt.preventDefault();
    const fakePaginationProps = {
      classApply: TrainingItemClassApply[AppRoute.MyTrainings],
      take: NULL_VALUE,
      totalItems: NULL_VALUE,
      handleShowMore: fakeCb,
      handleReturn: fakeCb,
    };
    render(<PaginationComponent {...fakePaginationProps} />);
    const expectedElement = screen.getByTestId(expectedTestId);
    expect(expectedElement).toBeInTheDocument();
  });
});
