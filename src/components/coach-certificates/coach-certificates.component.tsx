import { useRef, useState, ChangeEvent } from 'react'
import { CoachItemComponent } from '../index'
import { useAppSelector } from '../../hooks/hooks';
import { selectUser } from '../../store/user/user.selectors';
import { UserType } from '../../types';


export default function CoachCertificatesComponent(): JSX.Element {
  const { certificates } = useAppSelector(selectUser) as UserType;
  const [trainerCertificates, setTrainerCertificates] = useState<string[]>([certificates!] || []) ;
  const inputRef = useRef<HTMLInputElement>(null);
  const handleLoadButtonClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault()
    inputRef.current?.click()
  }
  const handleFileChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const newCertificate = evt.target.files && evt.target.files[0];
    if (!newCertificate) {
      return;
    }

  }
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
          <button className="btn-icon personal-account-coach__control" type="button" aria-label="previous">
            <svg width="16" height="14" aria-hidden="true">
              <use xlinkHref="#arrow-left"></use>
            </svg>
          </button>
          <button className="btn-icon personal-account-coach__control" type="button" aria-label="next">
            <svg width="16" height="14" aria-hidden="true">
              <use xlinkHref="#arrow-right"></use>
            </svg>
          </button>
        </div>
      </div>
      <ul className="personal-account-coach__list">
        <CoachItemComponent />
      </ul>
    </div>
  )
}
