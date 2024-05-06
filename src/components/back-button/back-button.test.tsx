import { render , screen } from '@testing-library/react';
import BackButtonComponent from './back-button.component';
import { BackButtonClassApply } from '../../const';

describe('Component: BackButtonComponent', () => {
  it('should render correctly', () => {
    const expectedButtonText = 'Назад';
    const expectedButttonTestId = 'buttonBack';
    const fakeClassApply = BackButtonClassApply.UserCard;
    const expectedButtonClass = `btn-flat ${fakeClassApply}`;
    render(<BackButtonComponent classApply={fakeClassApply} />);
    const buttonTextElement = screen.getByText(expectedButtonText);
    const buttonElement = screen.getByTestId(expectedButttonTestId);
    expect(buttonTextElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass(expectedButtonClass);
  });
});
