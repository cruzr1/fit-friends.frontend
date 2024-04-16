import { Location } from '../../const';
import { MapComponent } from '../index';

type PopupMapComponentProps = {
  handlePopupClose: () => void;
  location: Location;
}

export default function PopupMapComponent({handlePopupClose, location}: PopupMapComponentProps): JSX.Element {
  return (
    <div className="popup-form popup-form--map">
      <section className="popup">
        <div className="popup__wrapper popup__wrapper--map">
          <div className="popup-head popup-head--address">
            <h2 className="popup-head__header">Валерия</h2>
            <p className="popup-head__address">
              <svg className="popup-head__icon-location" width="12" height="14" aria-hidden="true">
                <use xlinkHref="#icon-location"></use>
              </svg><span>м. Адмиралтейская</span>
            </p>
            <button
              className="btn-icon btn-icon--outlined btn-icon--big"
              type="button"
              aria-label="close"
              onClick={() => handlePopupClose()}
            >
              <svg width="20" height="20" aria-hidden="true">
                <use xlinkHref="#icon-cross"></use>
              </svg>
            </button>
          </div>
          <MapComponent location={location} />
        </div>
      </section>
    </div>
  )
}
