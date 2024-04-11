import Slider from '@mui/material/Slider';
import { ShowValue, sliderStyle } from '../../const';

type RangeSliderComponentProps = {
  value: number[],
  maxValue: number,
  handleSliderChange: (value: number[]) => void;
  showValue: typeof ShowValue[keyof typeof ShowValue];
}

export default function RangeSliderComponent({value, maxValue, handleSliderChange, showValue}: RangeSliderComponentProps) {

  return (
    <Slider
      value={value}
      max={maxValue}
      onChange={({target}) => handleSliderChange((target as HTMLInputElement)?.value as unknown as number[])}
      sx={sliderStyle}
      valueLabelDisplay={showValue}
    />
  );
}
