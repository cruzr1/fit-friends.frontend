import { render , screen } from '@testing-library/react';
import CoachCertificatesComponent from './coach-certificates.component';
import { withStore } from '../../mocks/mock-component';
import { makeFakeStore } from '../../mocks/make-fake-store';

describe('Component: CoachCertificatesComponent', () => {
  it('should render correctly', () => {
    const expectedHeaderText = 'Дипломы и сертификаты';
    const expectedLoadText = 'Загрузить';
    const expectedCertificateItemTestId = 'item';
    const fakeCertificates = ['certificate.pdf'];
    const fakeStore = makeFakeStore();
    const { withStoreComponent} = withStore(<CoachCertificatesComponent certificates={fakeCertificates} />, fakeStore);
    render(withStoreComponent);
    const headerElement = screen.getByText(expectedHeaderText);
    const loadElement = screen.getByText(expectedLoadText);
    const certificateItemElement = screen.getByTestId(expectedCertificateItemTestId);
    expect(headerElement).toBeInTheDocument();
    expect(loadElement).toBeInTheDocument();
    expect(certificateItemElement).toBeInTheDocument();
  });
});
