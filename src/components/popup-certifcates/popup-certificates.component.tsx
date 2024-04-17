import { useEffect, useState } from 'react';
import { KEY_ESCAPE, NULL_VALUE, POPUP_CERTIFICATES_ITEMS_PER_PAGE, STEP } from '../../const';
import { adaptImage, blockPage, unblockPage } from '../../helpers';

type PopupCertificatesComponentProps = {
  handleCloseButtonClick: () => void;
  certificates: string;
}

export default function PopupCertificatesComponent({certificates, handleCloseButtonClick}: PopupCertificatesComponentProps): JSX.Element {
  useEffect(() => {
    let isMounted = true;
    blockPage()
    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === KEY_ESCAPE) {
        handleCloseButtonClick()
      }
    }
    document.addEventListener('keydown', (evt) => handleKeyDown(evt));
    return () => {
      isMounted = false;
      unblockPage()
    }
  }, [])
  const [first, setFirst] = useState<number>(NULL_VALUE);
  const certificatesVisible = [...certificates].slice(first, first + POPUP_CERTIFICATES_ITEMS_PER_PAGE);
  const handleNextButtonClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    if (first < certificates.length - POPUP_CERTIFICATES_ITEMS_PER_PAGE) {
      setFirst(first + STEP)
    }
  }
  const handlePreviousButtonClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    if (first > NULL_VALUE) {
      setFirst(first - STEP)
    }
  }
  return (
    <div className="popup-form">
      <section className="popup">
        <div className="popup__wrapper">
          <div className="popup-head">
            <h2 className="popup-head__header">Сертификаты</h2>
            <button
              className="btn-icon btn-icon--outlined btn-icon--big"
              type="button"
              aria-label="close"
              onClick={() => handleCloseButtonClick()}
            >
              <svg width="20" height="20" aria-hidden="true">
                <use xlinkHref="#icon-cross"></use>
              </svg>
            </button>
          </div>
          <div className="popup__content">
            <div className="personal-account-coach__controls">
              <button
                className="btn-icon personal-account-coach__control"
                type="button"
                aria-label="previous"
                disabled={first === NULL_VALUE}
                onClick={(evt) => handlePreviousButtonClick(evt)}
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
              </button>
              <button
                className="btn-icon personal-account-coach__control"
                type="button"
                aria-label="next"
                disabled={first === certificates.length - POPUP_CERTIFICATES_ITEMS_PER_PAGE}
                onClick={(evt) => handleNextButtonClick(evt)}
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
            </div>
            <ul className="personal-account-coach__list">
              {certificatesVisible.map((certificate) =>
                <li key={certificate}className="personal-account-coach__item">
                  <div className="certificate-card">
                    <div className="certificate-card__image">
                      <picture>
                        <source type="image/webp" srcSet={`/img/content/certificates-and-diplomas/${adaptImage(certificate)}.webp, /img/content/certificates-and-diplomas/${adaptImage(certificate)}@2x.webp 2x`} /><img src={`/img/content/certificates-and-diplomas/${adaptImage(certificate)}.jpg`} srcSet={`/img/content/certificates-and-diplomas/${adaptImage(certificate)}@2x.jpg 2x`} width="294" height="360" alt={certificate} />
                      </picture>
                    </div>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
