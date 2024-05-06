import { render , screen } from '@testing-library/react';
import RangeSliderComponent from './range-slider.component';
import { ShowValue, UserValidationParams } from '../../const';

describe('Component: RangeSliderComponent', () => {
  const expectedTestId = 'slider';
  it('should render correctly', () => {
    const fakeSliderProps = {
      value: [UserValidationParams.Calories.Value.Minimum, UserValidationParams.Calories.Value.Maximum],
      maxValue: UserValidationParams.Calories.Value.Maximum,
      handleSliderChange: () => undefined,
      showValue: ShowValue.Auto,
    };
    render(<RangeSliderComponent {...fakeSliderProps}/>);
    const expectedElement = screen.getByTestId(expectedTestId);
    expect(expectedElement).toBeInTheDocument();
  });
});

