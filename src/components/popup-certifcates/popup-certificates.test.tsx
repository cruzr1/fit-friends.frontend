import { render , screen } from '@testing-library/react';
import PopupCertificatesComponent from './popup-certificates.component';
import { makeFakeStore } from '../../mocks/make-fake-store';

describe('Component: PopupCertificatesComponent', () => {
  const expectedTestId = 'popup';
  it('should render correctly', () => {
    const fakeStore = makeFakeStore();
    const fakeCertificates = fakeStore.user.user?.certificates;
    if (!fakeCertificates) {
      return;
    }
    const fakeCb = () => undefined;
    render(<PopupCertificatesComponent certificates={fakeCertificates} handleCloseButtonClick={fakeCb}/>);
    const expectedElement = screen.getByTestId(expectedTestId);
    expect(expectedElement).toBeInTheDocument();
  });
});
