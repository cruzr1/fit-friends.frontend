import { Link, Navigate } from 'react-router-dom'
import { AppRoute, Location, TrainType, TrainTypeCaption, LocationCaption, Gender, GenderCaption, Level, LevelCaption, UserRole, NUMBER_REGEX, errorStyle, UserValidationParams, NULL_VALUE } from '../../const';
import { UpdateUserType } from '../../types';
import { updateUserAction } from '../../store/user/user.actions';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { adaptImage, isCaloriesValueValid, isDescriptionValid } from '../../helpers';
import { selectUser } from '../../store/user/user.selectors'
import { useState } from 'react'
import { CoachCertificatesComponent } from '../../components';

export default function PersonalAccountPage(): JSX.Element {
  const user = useAppSelector(selectUser);
  if (!user) {
    return <Navigate to={AppRoute.Index} />
  }
  const {name, description, isReadyTrain, trainType, location, role, gender, level, avatar, caloriesDaily = 0, caloriesTarget = 0} = user;
  const isCoach = role === UserRole.Trainer;
  const dispatch = useAppDispatch();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [userCaloriesTarget, setUserCaloriesTarget] = useState<number>(caloriesTarget);
  const [userCaloriesDaily, setUserCaloriesDaily] = useState<number>(caloriesDaily);
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
  const isValidForm =
    isDescriptionValid(userDescription) &&
    isCaloriesValueValid(userCaloriesDaily) &&
    isCaloriesValueValid(userCaloriesTarget);
  const handleEditButtonClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    if (isDisabled) {
      setIsDisabled(false);
      return;
    }
    if (isValidForm) {
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
      if (userCaloriesDaily > NULL_VALUE && userCaloriesTarget > 0) {
        Object.assign(userUpdate, {
          caloriesDaily: userCaloriesDaily,
          caloriesTarget: userCaloriesTarget,
        })
      }
      dispatch(updateUserAction(userUpdate))
    }
  }
  const handleLocationItemChange = (target: HTMLUListElement ) => {
    setUserLocation(target.id as Location);
    setLocationOpen(false);
  }
  const handleGenderItemChange = (target: HTMLUListElement ) => {
    setUserGender(target.id as Gender);
    setGenderOpen(false);
  }
  const handleLevelItemChange = (target: HTMLUListElement ) => {
    setUserLevel(target.id as Level);
    setLevelOpen(false);
  }
  const handleTrainTypeChange = (type: TrainType) => {
    const newTrainType = userTrainType.includes(type)
      ? userTrainType.filter((trainType) => trainType !== type)
      : userTrainType.concat(type);
    setUserTrainType(newTrainType);
  }
  return (
    <section className="inner-page">
      <div className="container">
        <div className="inner-page__wrapper">
          <h1 className="visually-hidden">Личный кабинет</h1>
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
                    {(userDescription.length > UserValidationParams.Description.Length.Maximum || userDescription.length < UserValidationParams.Description.Length.Minimum) && <p style={errorStyle}>Длина текста 10 до 140 символов</p>}
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
          <div className="inner-page__content">
            {!isCoach &&
              <div className="personal-account-user">
              <div className="personal-account-user__schedule">
                <form action="#" method="get">
                  <div className="personal-account-user__form">
                    <div className="personal-account-user__input">
                      <label><span className="personal-account-user__label">План на день, ккал</span>
                        <input
                          type="text"
                          name="schedule-for-the-day"
                          value={userCaloriesDaily}
                          disabled={isDisabled}
                          onChange={(evt) => setUserCaloriesDaily(+(evt.target as HTMLInputElement).value.replace(NUMBER_REGEX, ''))}
                          />
                        {!isCaloriesValueValid(userCaloriesDaily) && <p style={errorStyle}>Значение 1000 до 5000</p>}
                      </label>
                    </div>

                    <div className="personal-account-user__input">
                      <label>
                        <span className="personal-account-user__label">План на неделю, ккал</span>
                        <input
                          type="text"
                          name="schedule-for-the-week"
                          value={userCaloriesTarget}
                          disabled={isDisabled}
                          onChange={(evt) => setUserCaloriesTarget(+(evt.target as HTMLInputElement).value.replace(NUMBER_REGEX, ''))}
                        />
                        {!isCaloriesValueValid(userCaloriesTarget) && <p style={errorStyle}>Значение 1000 до 5000</p>}
                      </label>
                    </div>
                  </div>
                </form>
              </div>
                <div className="personal-account-user__additional-info">
                  <Link className="thumbnail-link thumbnail-link--theme-light" to={AppRoute.MyFriends}>
                    <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                      <svg width="30" height="26" aria-hidden="true">
                        <use xlinkHref="#icon-friends"></use>
                      </svg>
                    </div>
                    <span className="thumbnail-link__text">Мои друзья</span>
                  </Link>
                  <Link className="thumbnail-link thumbnail-link--theme-light" to={AppRoute.MyPurchases}>
                    <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                      <svg width="30" height="26" aria-hidden="true">
                        <use xlinkHref="#icon-shopping-cart"></use>
                      </svg>
                    </div>
                    <span className="thumbnail-link__text">Мои покупки</span>
                  </Link>
                  <div className="thumbnail-spec-gym">
                    <div className="thumbnail-spec-gym__image">
                      <picture>
                        <source type="image/webp" srcSet="/img/content/thumbnails/nearest-gym-01.webp, /img/content/thumbnails/nearest-gym-01@2x.webp 2x" /><img src="/img/content/thumbnails/nearest-gym-01.jpg" srcSet="/img/content/thumbnails/nearest-gym-01@2x.jpg 2x" width="330" height="190" alt="" />
                      </picture>
                    </div>
                    <p className="thumbnail-spec-gym__type">Ближайший зал</p>
                    <div className="thumbnail-spec-gym__header" style={{textAlign:"center"}}>
                      <h3 className="thumbnail-spec-gym__title">Скоро тут появится что-то полезное</h3>
                    </div>
                  </div>
                </div>
              </div>
            }
            {isCoach &&
              <div className="personal-account-coach">
                <div className="personal-account-coach__navigation">
                  <Link className="thumbnail-link thumbnail-link--theme-light" to={AppRoute.MyTrainings}>
                    <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                      <svg width="30" height="26" aria-hidden="true">
                        <use xlinkHref="#icon-flash"></use>
                      </svg>
                    </div>
                    <span className="thumbnail-link__text">Мои тренировки</span>
                  </Link>
                  <Link className="thumbnail-link thumbnail-link--theme-light" to={AppRoute.CreateTraining}>
                    <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                      <svg width="30" height="26" aria-hidden="true">
                        <use xlinkHref="#icon-add"></use>
                      </svg>
                    </div><span className="thumbnail-link__text">Создать тренировку</span>
                  </Link>
                  <Link className="thumbnail-link thumbnail-link--theme-light" to={AppRoute.MyFriends}>
                    <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                      <svg width="30" height="26" aria-hidden="true">
                        <use xlinkHref="#icon-friends"></use>
                      </svg>
                    </div>
                    <span className="thumbnail-link__text">Мои друзья</span>
                  </Link>
                  <Link className="thumbnail-link thumbnail-link--theme-light" to={AppRoute.MyOrders}>
                    <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                      <svg width="30" height="26" aria-hidden="true">
                        <use xlinkHref="#icon-bag"></use>
                      </svg>
                    </div>
                    <span className="thumbnail-link__text">Мои заказы</span>
                  </Link>
                  <div className="personal-account-coach__calendar">
                    <div className="thumbnail-spec-gym">
                      <div className="thumbnail-spec-gym__image">
                        <picture>
                          <source type="image/webp" srcSet="/img/content/thumbnails/nearest-gym-01.webp, /img/content/thumbnails/nearest-gym-01@2x.webp 2x" /><img src="/img/content/thumbnails/nearest-gym-01.jpg" srcSet="/img/content/thumbnails/nearest-gym-01@2x.jpg 2x" width="330" height="190" alt="" />
                        </picture>
                      </div>
                      <p className="thumbnail-spec-gym__type">Ближайший зал</p>
                      <div className="thumbnail-spec-gym__header" style={{textAlign:"center"}}>
                        <h3 className="thumbnail-spec-gym__title">Скоро тут будет интересно</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <CoachCertificatesComponent />
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  )
}
