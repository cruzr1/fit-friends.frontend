import { useRef, useState, ChangeEvent } from 'react';
import { CoachItemComponent } from '../index';
import { useAppDispatch } from '../../hooks/hooks';
import { ITEMS_PER_PAGE, NULL_VALUE, STEP } from '../../const';
import { updateUserAction } from '../../store/user/user.actions';

type CoachCertificatesComponentProps ={
  certificates: string[];
}

export default function CoachCertificatesComponent({certificates}: CoachCertificatesComponentProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [trainerCertificates, setTrainerCertificates] = useState<string[]>(certificates) ;
  const [first, setFirst] = useState<number>(NULL_VALUE);
  const certificatesVisible = trainerCertificates.slice(first, first + ITEMS_PER_PAGE);
  const [editCertificates, setEditCertificates] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const updateRef = useRef<HTMLInputElement>(null);
  const [updateCertificate, setUpdateCertificate] = useState<string>('');
  const handleLoadButtonClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    inputRef.current?.click();
  };
  const handleSaveButtonClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    setEditCertificates(editCertificates.filter((certificate) => certificate !== evt.currentTarget.value));
    dispatch(updateUserAction({certificates: trainerCertificates[NULL_VALUE]}));
  };
  const handleEditButtonClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    setEditCertificates(editCertificates.concat(evt.currentTarget.value));
  };
  const handleNextButtonClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    if (first < trainerCertificates.length - ITEMS_PER_PAGE) {
      setFirst(first + STEP);
    }
  };
  const handlePreviousButtonClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    if (first > NULL_VALUE) {
      setFirst(first - STEP);
    }
  };
  const handleDeleteButtonClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    setEditCertificates(editCertificates.filter((certificate) => certificate !== evt.currentTarget.value));
    setTrainerCertificates(trainerCertificates.filter((certificate) => certificate !== evt.currentTarget.value));

  };
  const handleUpdateButtonClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    setUpdateCertificate(evt.currentTarget.value);
    updateRef.current?.click();
  };
  const handleUpdateChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const newCertificate = evt.target.files && evt.target.files[0];
    if (newCertificate && newCertificate.name !== updateCertificate && !trainerCertificates.includes(newCertificate.name)) {
      setEditCertificates(editCertificates
        .filter((certificate) => certificate !== updateCertificate)
        .concat(newCertificate.name)
      );
      setTrainerCertificates(trainerCertificates
        .filter((certificate) => certificate !== updateCertificate)
        .concat(newCertificate.name));
    }

  };
  const handleFileChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const newCertificate = evt.target.files && evt.target.files[0];
    if (!newCertificate) {
      return;
    }
    setTrainerCertificates(trainerCertificates.concat(newCertificate.name));
  };
  return (
    <div className="personal-account-coach__additional-info">
      <div className="personal-account-coach__label-wrapper">
        <h2 className="personal-account-coach__label">Дипломы и сертификаты</h2>
        <input
          type="file"
          style={{display: 'none'}}
          ref={inputRef}
          onChange={(evt) => handleFileChange(evt)}
        />
        <input
          type="file"
          style={{display: 'none'}}
          ref={updateRef}
          onChange={(evt) => handleUpdateChange(evt)}
        />
        <button
          className="btn-flat btn-flat--underlined personal-account-coach__button"
          type="button"
          onClick={(evt) => handleLoadButtonClick(evt)}
        >
          <svg width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-import"></use>
          </svg><span>Загрузить</span>
        </button>
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
            disabled={first === trainerCertificates.length - ITEMS_PER_PAGE}
            onClick={(evt) => handleNextButtonClick(evt)}
          >
            <svg width="16" height="14" aria-hidden="true">
              <use xlinkHref="#arrow-right"></use>
            </svg>
          </button>
        </div>
      </div>
      <ul className="personal-account-coach__list">
        {certificatesVisible.map((certificate) =>
          (
            <li key={certificate}className="personal-account-coach__item">
              <CoachItemComponent
                certificate={certificate}
                handleDeleteButtonClick={handleDeleteButtonClick}
                handleUpdateButtonClick={handleUpdateButtonClick}
                handleSaveButtonClick={handleSaveButtonClick}
                handleEditButtonClick={handleEditButtonClick}
                isEdit={editCertificates.includes(certificate)}
              />
            </li>
          )
        )}
      </ul>
    </div>
  );
}
