import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectUser } from '../../store/user/user.selectors';
import { UpdateUserType, UserType } from '../../types';
import { Location, TrainType, TrainTypeCaption, LocationCaption, Gender, GenderCaption, Level, LevelCaption } from '../../const';
import { updateUserAction } from '../../store/user/user.actions';
import { adaptImage } from '../../helpers';

export default function UserInfoComponent(): JSX.Element {
  const dispatch = useAppDispatch();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const {name, description, isReadyTrain, trainType, location, gender, level, avatar} = useAppSelector(selectUser) as UserType;
  const [userName, setUserName] = useState<string>(name);
  const [userDescription, setUserDescription] = useState<string>(description);
  const [isUserReadyTrain, setUserReadyTrain] = useState<boolean>(isReadyTrain || true);
  const [userTrainType, setUserTrainType] = useState<TrainType[]>(trainType || []);
  const [userLocation, setUserLocation] = useState<Location>(location);
  const [locationOpen, setLocationOpen] = useState<boolean>(false);
  const [userGender, setUserGender] = useState<Gender>(gender);
  const [genderOpen, setGenderOpen] = useState<boolean>(false);
  const [userLevel, setUserLevel] = useState<Level>(level || Level.Newby);
  const [levelOpen, setLevelOpen] = useState<boolean>(false);
  const handleEditButtonClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    if (isDisabled) {
      setIsDisabled(false);
      return;
    }
    setIsDisabled(true);
    const userUpdate: UpdateUserType = {
      name: userName,
      description: userDescription,
      isReadyTrain: isUserReadyTrain,
      trainType: userTrainType,
      location: userLocation,
      gender: userGender,
      level: userLevel,
    }
    dispatch(updateUserAction(userUpdate))
  }
  const handleLocationItemChange = (target: HTMLUListElement ) => {
    setUserLocation(target.id as Location);
    setLocationOpen(false)
  }
  const handleGenderItemChange = (target: HTMLUListElement ) => {
    setUserGender(target.id as Gender);
    setGenderOpen(false)
  }
  const handleLevelItemChange = (target: HTMLUListElement ) => {
    setUserLevel(target.id as Level);
    setLevelOpen(false)
  }
  const handleTrainTypeChange = (type: TrainType) => {
    const newTrainType = userTrainType.includes(type)
      ? userTrainType.filter((trainType) => trainType !== type)
      : userTrainType.concat(type);
    setUserTrainType(newTrainType);
  }
  return (
    <section className="user-info">
      <div className="user-info__header">
        <div className="input-load-avatar">
          <label>
            <input className="visually-hidden" type="file" name={avatar} accept="image/png, image/jpeg" /><span className="input-load-avatar__avatar"><img src={`img/content/avatars/users/${adaptImage(avatar)}.png`} srcSet={`img/content/avatars/users/${adaptImage(avatar)}@2x.png 2x`} width="98" height="98" alt="user photo" /></span>
          </label>
        </div>
      </div>
      <form className="user-info__form" action="#" method="post">
        <button
          className="btn-flat btn-flat--underlined user-info__edit-button"
          type="button"
          aria-label="Редактировать"
          onClick={(evt) => handleEditButtonClick(evt)}
        >
          <svg width="12" height="12" aria-hidden="true">
            <use xlinkHref="#icon-edit"></use>
          </svg><span>{isDisabled ? 'Редактировать' : 'Сохранить'}</span>
        </button>
        <div className="user-info__section">
          <h2 className="user-info__title">Обо мне</h2>
          <div className="custom-input custom-input--readonly user-info__input">
            <label><span className="custom-input__label">Имя</span><span className="custom-input__wrapper">
                <input
                  type="text"
                  name="name"
                  value={userName}
                  disabled={isDisabled}
                  onChange={(evt) => setUserName(evt.target.value)}
                /></span>
            </label>
          </div>
          <div className="custom-textarea custom-textarea--readonly user-info__textarea">
            <label><span className="custom-textarea__label">Описание</span>
              <textarea
                name="description"
                placeholder=" "
                value={userDescription}
                disabled={isDisabled}
                onChange={(evt) => setUserDescription(evt.target.value)}
              ></textarea>
            </label>
          </div>
        </div>
        <div className="user-info__section user-info__section--status">
          <h2 className="user-info__title user-info__title--status">Статус</h2>
          <div className="custom-toggle custom-toggle--switch user-info__toggle">
            <label>
              <input
                type="checkbox"
                name="ready-for-training"
                disabled={isDisabled}
                checked={isUserReadyTrain}
                onChange={() => setUserReadyTrain(!isUserReadyTrain)}
              /><span className="custom-toggle__icon">
                <svg width="9" height="6" aria-hidden="true">
                  <use xlinkHref="#arrow-check"></use>
                </svg></span><span className="custom-toggle__label">Готов тренировать</span>
            </label>
          </div>
        </div>
        <div className="user-info__section">
          <h2 className="user-info__title user-info__title--specialization">Специализация</h2>
          <div className="specialization-checkbox user-info__specialization">
            {Object.values(TrainType).map((type) => <div key={type} className="btn-checkbox">
              <label>
                <input
                  className="visually-hidden"
                  type="checkbox"
                  name="specialization"
                  value={type}
                  disabled={isDisabled}
                  onChange={(evt) => handleTrainTypeChange(evt.target.value as TrainType)}
                  checked={userTrainType.includes(type)}
                /><span className="btn-checkbox__btn">{TrainTypeCaption[type]}</span>
              </label>
            </div>)}
          </div>
        </div>
        <div
          className={`
            custom-select
            ${isDisabled ? 'custom-select--readonly' : ''}
            ${locationOpen ? 'is-open' : ''}
            custom-select user-info__select"
          `}><span className="custom-select__label">Локация</span>
          <div className="custom-select__placeholder">{LocationCaption[userLocation]}</div>
          <button
            className="custom-select__button"
            type="button"
            aria-label="Выберите одну из опций"
            disabled={isDisabled}
            onClick={() => setLocationOpen(!locationOpen)}
          ><span className="custom-select__text"></span><span className="custom-select__icon">
              <svg width="15" height="6" aria-hidden="true">
                <use xlinkHref="#arrow-down"></use>
              </svg></span></button>
          <ul className="custom-select__list" role="listbox" onClick={(evt) => handleLocationItemChange(evt.target as HTMLUListElement)}>
            {Object.values(Location).map((location) =>
            <li key={location} className="custom-select__item" id={location} role='option'>{LocationCaption[location]}</li>)}
          </ul>
        </div>
        <div className={`
            custom-select
            ${isDisabled ? 'custom-select--readonly' : ''}
            ${genderOpen ? 'is-open' : ''}
            custom-select user-info__select"
          `}><span className="custom-select__label">Пол</span>
          <div className="custom-select__placeholder">{GenderCaption[userGender]}</div>
          <button
            className="custom-select__button"
            type="button"
            aria-label="Выберите одну из опций"
            disabled={isDisabled}
            onClick={() => setGenderOpen(!genderOpen)}
          ><span className="custom-select__text"></span><span className="custom-select__icon">
              <svg width="15" height="6" aria-hidden="true">
                <use xlinkHref="#arrow-down"></use>
              </svg></span></button>
          <ul className="custom-select__list" role="listbox" onClick={(evt) => handleGenderItemChange(evt.target as HTMLUListElement)}>
            {Object.values(Gender).map((gender) =>
            <li key={gender} className="custom-select__item" id={gender} role='option'>{GenderCaption[gender]}</li>)}
          </ul>
        </div>
        <div className={`
            custom-select
            ${isDisabled ? 'custom-select--readonly' : ''}
            ${levelOpen ? 'is-open' : ''}
            custom-select user-info__select"
          `}><span className="custom-select__label">Уровень</span>
          <div className="custom-select__placeholder">{LevelCaption[userLevel]}</div>
          <button
            className="custom-select__button"
            type="button"
            aria-label="Выберите одну из опций"
            disabled={isDisabled}
            onClick={() => setLevelOpen(!levelOpen)}
          ><span className="custom-select__text"></span><span className="custom-select__icon">
              <svg width="15" height="6" aria-hidden="true">
                <use xlinkHref="#arrow-down"></use>
              </svg></span></button>
          <ul className="custom-select__list" role="listbox" onClick={(evt) => handleLevelItemChange(evt.target as HTMLUListElement)}>
            {Object.values(Level).map((option) =>
            <li key={option} className="custom-select__item" id={option} role='option'>{LevelCaption[option]}</li>)}
          </ul>
        </div>
      </form>
    </section>
  )
}
