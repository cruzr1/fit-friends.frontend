import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute, NULL_VALUE, MAIN_ITEMS_PER_PAGE, STEP } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { loadPopularTrainingsAction } from '../../store/training/training.actions';
import { selectPopularTrainings } from '../../store/training/training.selectors';
import ThumbnailSpecGymComponent from '../thumbnail-spec-gym/thumbnail-spec-gym.component';
import TrainingItemComponent from '../training-item/training-item.component';

export default function PopularTrainingsComponent(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      dispatch(loadPopularTrainingsAction());
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch]);
  const popularTrainings = useAppSelector(selectPopularTrainings);
  const [first, setFirst] = useState<number>(NULL_VALUE);
  const popularTrainingsVisible = popularTrainings.slice(first, first + MAIN_ITEMS_PER_PAGE);
  const handleNextButtonClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    if (first < popularTrainings.length - MAIN_ITEMS_PER_PAGE) {
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
    <section className="popular-trainings">
      <div className="container">
        <div className="popular-trainings__wrapper">
          <div className="popular-trainings__title-wrapper">
            <h2 className="popular-trainings__title">Популярные тренировки</h2>
            <button
              className="btn-flat popular-trainings__button"
              type="button"
              onClick={() => navigate(AppRoute.TrainingCatalogue)}
            ><span>Смотреть все</span>
              <svg width="14" height="10" aria-hidden="true">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </button>
            <div className="popular-trainings__controls">
              <button
                className="btn-icon popular-trainings__control"
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
                className="btn-icon popular-trainings__control"
                type="button"
                aria-label="next"
                disabled={first === popularTrainings.length - MAIN_ITEMS_PER_PAGE}
                onClick={(evt) => handleNextButtonClick(evt)}
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
            </div>
          </div>
          {popularTrainingsVisible.length > 0 &&
            <ul className="popular-trainings__list">
              {popularTrainingsVisible.map(({id, price, name, trainType, calories, description, rating, backgroundImage}) =>
                (
                  <li key={id} className="popular-trainings__item">
                    <TrainingItemComponent {...{id, price, name, trainType, calories, description, rating, backgroundImage}}/>
                  </li>
                )
              )}
            </ul>}
          {popularTrainingsVisible.length === 0 && <ThumbnailSpecGymComponent />}
        </div>
      </div>
    </section>
  );
}
