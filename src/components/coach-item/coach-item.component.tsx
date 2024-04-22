import { adaptImage } from '../../helpers';

type CoachItemComponentProps = {
  certificate: string;
  handleDeleteButtonClick: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleUpdateButtonClick: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleSaveButtonClick: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleEditButtonClick: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isEdit: boolean;
}

export default function CoachItemComponent({certificate, handleDeleteButtonClick, handleUpdateButtonClick, handleSaveButtonClick, handleEditButtonClick, isEdit}: CoachItemComponentProps): JSX.Element {

  return (
    <div className={`certificate-card ${isEdit ? 'certificate-card--edit' : 'certificate-card--save'}`}>
      <div className="certificate-card__image">
        <picture>
          <source type="image/webp" srcSet={`/img/content/certificates-and-diplomas/${adaptImage(certificate)}.webp, /img/content/certificates-and-diplomas/${adaptImage(certificate)}@2x.webp 2x`} /><img src={`/img/content/certificates-and-diplomas/${adaptImage(certificate)}.jpg`} srcSet={`/img/content/certificates-and-diplomas/${adaptImage(certificate)}@2x.jpg 2x`} width="294" height="360" alt={certificate} />
        </picture>
      </div>
      <div className="certificate-card__buttons">
        {!isEdit &&
            <button
              className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit"
              type="button"
              value={certificate}
              onClick={(evt) => handleEditButtonClick(evt)}
            >
              <svg width="12" height="12" aria-hidden="true">
                <use xlinkHref="#icon-edit"></use>
              </svg><span>Изменить</span>
            </button>}
        {isEdit &&
            <>
              <button
                className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save"
                type="button"
                value={certificate}
                onClick={(evt) => handleSaveButtonClick(evt)}
              >
                <svg width="12" height="12" aria-hidden="true">
                  <use xlinkHref="#icon-edit"></use>
                </svg><span>Сохранить</span>
              </button>
              <div className="certificate-card__controls">
                <button
                  className="btn-icon certificate-card__control"
                  type="button"
                  aria-label="next"
                  value={certificate}
                  onClick={(evt) => handleUpdateButtonClick(evt)}
                >
                  <svg width="16" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-change"></use>
                  </svg>
                </button>
                <button
                  className="btn-icon certificate-card__control"
                  type="button"
                  aria-label="next"
                  value={certificate}
                  onClick={(evt) => handleDeleteButtonClick(evt)}
                >
                  <svg width="14" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-trash"></use>
                  </svg>
                </button>
              </div>
            </>}
      </div>
    </div>
  );
}
