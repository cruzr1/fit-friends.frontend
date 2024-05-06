import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute, NULL_VALUE, MAIN_ITEMS_PER_PAGE, STEP } from '../../const';
import {ThumbnailSpecGymComponent, UserItemComponent} from '../index';
import { selectUsersReadyTrain } from '../../store/user/user.selectors';
import { loadUsersReadyTrainAction } from '../../store/user/user.actions';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

export default function LookForCompanyComponent(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      dispatch(loadUsersReadyTrainAction());
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch]);
  const readyUsers = useAppSelector(selectUsersReadyTrain);
  const [first, setFirst] = useState<number>(NULL_VALUE);
  const usersReadyVisible = readyUsers.slice(first, first + MAIN_ITEMS_PER_PAGE);
  const handleNextButtonClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    if (first < readyUsers.length - MAIN_ITEMS_PER_PAGE) {
      setFirst(first + STEP);
    }
  };
  const handlePreviousButtonClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    if (first > NULL_VALUE) {
      setFirst(first - STEP);
    }
  };
  return (
    <section className="look-for-company" data-testid='lookForCompany'>
      <div className="container">
        <div className="look-for-company__wrapper">
          <div className="look-for-company__title-wrapper">
            <h2 className="look-for-company__title">Ищут компанию для тренировки</h2>
            <button
              className="btn-flat btn-flat--light look-for-company__button"
              type="button"
              onClick={() => navigate(AppRoute.UserCatalogue)}
            ><span>Смотреть все</span>
              <svg width="14" height="10" aria-hidden="true">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </button>
            <div className="look-for-company__controls">
              <button
                className="btn-icon btn-icon--outlined look-for-company__control"
                type="button" aria-label="previous"
                disabled={first === NULL_VALUE}
                onClick={(evt) => handlePreviousButtonClick(evt)}
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
              </button>
              <button
                className="btn-icon btn-icon--outlined look-for-company__control"
                type="button"
                aria-label="next"
                disabled={first === readyUsers.length - MAIN_ITEMS_PER_PAGE}
                onClick={(evt) => handleNextButtonClick(evt)}
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
            </div>
          </div>
          {usersReadyVisible.length > 0 &&
          <ul className="look-for-company__list">
            {usersReadyVisible.map(({id, location, name, trainType = [], role, avatar}) =>
              (
                <li key={id} className="look-for-company__item">
                  <UserItemComponent {...{id, location, name, trainType, role, avatar}} />
                </li>
              )
            )}
          </ul>}
          {usersReadyVisible.length === 0 && <ThumbnailSpecGymComponent />}
        </div>
      </div>
    </section>
  );
}
