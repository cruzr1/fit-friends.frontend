import { useEffect } from 'react';
import { KEY_ESCAPE, Location, LocationCaption } from '../../const';
import { MapComponent } from '../index';
import { blockPage, unblockPage } from '../../helpers';

type PopupMapComponentProps = {
  handlePopupClose: () => void;
  location: Location;
  name: string;
}

export default function PopupMapComponent({handlePopupClose, location, name}: PopupMapComponentProps): JSX.Element {
  useEffect(() => {
    let isMounted = true;
    blockPage()
    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === KEY_ESCAPE) {
        handlePopupClose()
      }
    }
    document.addEventListener('keydown', (evt) => handleKeyDown(evt));
    return () => {
      isMounted = false;
      unblockPage()
    }
  }, [])
  return (
    <div className="popup-form popup-form--map">
      <section className="popup">
        <div className="popup__wrapper popup__wrapper--map">
          <div className="popup-head popup-head--address">
            <h2 className="popup-head__header">{name}</h2>
            <p className="popup-head__address">
              <svg className="popup-head__icon-location" width="12" height="14" aria-hidden="true">
                <use xlinkHref="#icon-location"></use>
              </svg><span>{`м. ${LocationCaption[location]}`}</span>
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
