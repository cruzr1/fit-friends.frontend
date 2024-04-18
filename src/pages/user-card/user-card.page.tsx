import { BackButtonComponent, TrainingItemComponent, UserCardContentComponent, PopupCertificatesComponent, PopupMapComponent } from '../../components';
import { BackButtonClassApply, UserRole } from '../../const';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectUser, selectUserItem } from '../../store/user/user.selectors';
import { useEffect, useState } from 'react';
import { applyPersonalTrainingAction, loadUserItemAction, loadUserItemTrainingsAction, subscribeNotificationsAction } from '../../store/user/user.actions';
import LoadingPage from '../loading/loading.page';
import { selectTrainingsList } from '../../store/training/training.selectors';

export default function UserCardPage(): JSX.Element {
  const userId= useParams().userId as string;
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      dispatch(loadUserItemAction(userId));
      dispatch(loadUserItemTrainingsAction(userId));
    }
    return () => {
      isMounted = false;
    }
  }, [dispatch]);
  const userItem = useAppSelector(selectUserItem);
  const trainings = useAppSelector(selectTrainingsList);
  const [isShownCertificate, setIsShownCertificate] = useState<boolean>(false);
  const [isShownMap, setIsShownMap] = useState<boolean>(false);
  const [hasApplied, setHasApplied] = useState<boolean>(false);
  const handlePopupClose = () => {
    if (isShownCertificate) {
      setIsShownCertificate(false);
    }
    if (isShownMap) {
      setIsShownMap(false);
    }
  }
  const handleShowCertificatesButtonClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    setIsShownMap(false);
    setIsShownCertificate(true);
  }
  const handleApplicationButtonClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    dispatch(applyPersonalTrainingAction(userId));
    setHasApplied(true);
  }
  const handleMapLinkClick = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    evt.preventDefault();
    setIsShownCertificate(false);
    setIsShownMap(true);
  }
  const handleSubscribeStatusChange = () => {
    dispatch(subscribeNotificationsAction(userId));
  }
  if (!userItem) {
    return <LoadingPage />
  }
  const {id, role, name, location, description, trainType = [], certificates, isReadyTrain } = userItem;
  const isCoach = role === UserRole.Trainer ? true : false;
  const classApply = isCoach ? 'user-card-coach' : 'user-card';
  return (
    <>
      <div className="inner-page inner-page--no-sidebar">
        <div className="container">
          <div className="inner-page__wrapper">
            <BackButtonComponent classApply={BackButtonClassApply.UserCard} />
            <div className="inner-page__content">
              <section className={`${classApply}`}>
                <h1 className="visually-hidden">Карточка пользователя{ isCoach &&' роль тренер'}</h1>
                <div className={`${classApply}__wrapper`}>
                  {isCoach &&
                    <div className={`${classApply}__card`}>
                      <UserCardContentComponent {...{ id, classApply, name, location, isCoach, description, trainType, handleShowCertificatesButtonClick, handleMapLinkClick, isReadyTrain }} />
                    </div>
                  }
                  {!isCoach &&
                    <UserCardContentComponent {...{ id, classApply, name, location, isCoach, description, trainType, handleShowCertificatesButtonClick, handleMapLinkClick, isReadyTrain}} />
                  }
                  {isCoach &&
                    <div className="user-card-coach__training">
                      <div className="user-card-coach__training-head">
                        <h2 className="user-card-coach__training-title">Тренировки</h2>
                        <div className="user-card-coach__training-bts">
                          <button className="btn-icon user-card-coach__training-btn" type="button" aria-label="back">
                            <svg width="14" height="10" aria-hidden="true">
                              <use xlinkHref="#arrow-left"></use>
                            </svg>
                          </button>
                          <button className="btn-icon user-card-coach__training-btn" type="button" aria-label="next">
                            <svg width="14" height="10" aria-hidden="true">
                              <use xlinkHref="#arrow-right"></use>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <ul className="user-card-coach__training-list">
                        {trainings.map(({id, price, name, trainType, calories, description, rating, backgroundImage}) =>
                          <li key={id} className="user-card-coach__training-item">
                            <TrainingItemComponent {...{id, price, name, trainType, calories, description, rating, backgroundImage}} />
                          </li>
                        )}
                      </ul>
                      <form className="user-card-coach__training-form">
                        <button
                          className="btn user-card-coach__btn-training"
                          type="button"
                          disabled={!isReadyTrain || hasApplied}
                          onClick={(evt) => handleApplicationButtonClick(evt)}
                        >{hasApplied ? 'Запрос на тренировку отправлен' : 'Хочу персональную тренировку'}</button>
                        <div className="user-card-coach__training-check">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input
                                type="checkbox"
                                value="user-agreement-1"
                                name="user-agreement"
                                checked={user?.subscribedFor?.includes(userId)}
                                onChange={() => handleSubscribeStatusChange()}
                              /><span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg></span><span className="custom-toggle__label">Получать уведомление на почту о новой тренировке</span>
                            </label>
                          </div>
                        </div>
                      </form>
                    </div>
                  }
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      {isShownCertificate && certificates &&
        <PopupCertificatesComponent certificates={certificates} handleCloseButtonClick={handlePopupClose} />
      }
      {isShownMap &&
        <PopupMapComponent handlePopupClose={handlePopupClose} location={location} name={name} />
      }
    </>
  )
}
