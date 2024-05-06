import { render , screen } from '@testing-library/react';
import PopupMapComponent from './popup-map.component';
import { makeFakeStore } from '../../mocks/make-fake-store';

describe('Component: PopupMapComponent', () => {
  const expectedTestId = 'popup';
  it('should render correctly', () => {
    const fakeStore = makeFakeStore();
    const fakeLocation = fakeStore.user.user?.location;
    const fakeName = fakeStore.user.user?.name;
    if (!fakeLocation || !fakeName) {
      return;
    }
    const fakeCb = () => undefined;
    render(
      <PopupMapComponent
        location={fakeLocation}
        name={fakeName}
        handlePopupClose={fakeCb}
      />
    );
    const expectedElement = screen.getByTestId(expectedTestId);
    expect(expectedElement).toBeInTheDocument();
  });
});
