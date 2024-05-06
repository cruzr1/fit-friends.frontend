import { render , screen } from '@testing-library/react';
import MapComponent from './map.component';
import { Location } from '../../const';

describe('Component: MapComponent', () => {
  it('should render correct', () => {
    const expectedMapTestId = 'map-element';
    const fakeLocation = Location.Petrogradskaya;
    render(<MapComponent location={fakeLocation} />);

    expect(screen.getByTestId(expectedMapTestId)).toBeInTheDocument();
  });
});
