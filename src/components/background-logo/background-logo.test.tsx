import { render , screen } from '@testing-library/react';
import BackgroundLogoComponent from './background-logo.component';

describe('Component: BackgroundLogoComponent', () => {
  it('should render correctly', () => {
    const logoclass = 'background-logo__logo';
    const iconclass = 'background-logo__icon';
    render(<BackgroundLogoComponent />);
    const logoElement = screen.getByTestId('logo');
    const iconElement = screen.getByTestId('icon');
    expect(logoElement).toHaveClass(logoclass);
    expect(iconElement).toHaveClass(iconclass);
  });
});
