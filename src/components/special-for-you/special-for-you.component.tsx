import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectChoiseTrainings } from '../../store/training/training.selectors';
import { loadChoiseTrainingsAction } from '../../store/training/training.actions';
import { ITEMS_PER_PAGE, NULL_VALUE, STEP } from '../../const';
import {ThumbnailTrainingPreviewComponent, ThumbnailSpecGymComponent} from '../index';
import { UserType } from '../../types';

type SpecialForYouComponentProps = {
  user: UserType;
}

export default function SpecialForYouComponent({user}: SpecialForYouComponentProps): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const {trainType, level, caloriesDaily, duration} = user;
      dispatch(loadChoiseTrainingsAction({trainType, level, caloriesDaily, duration}));
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch, user]);
  const choiseTrainings = useAppSelector(selectChoiseTrainings);
  const [first, setFirst] = useState<number>(NULL_VALUE);
  const choiseTrainingsVisible = choiseTrainings.slice(first, first + ITEMS_PER_PAGE);
  const handleNextButtonClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    if (first < choiseTrainings.length - ITEMS_PER_PAGE) {
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
    <section className="special-for-you">
      <div className="container">
        <div className="special-for-you__wrapper">
          <div className="special-for-you__title-wrapper">
            <h2 className="special-for-you__title">Специально подобрано для вас</h2>
            <div className="special-for-you__controls">
              <button
                className="btn-icon special-for-you__control"
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
                className="btn-icon special-for-you__control"
                type="button"
                aria-label="next"
                disabled={first === choiseTrainings.length - ITEMS_PER_PAGE}
                onClick={(evt) => handleNextButtonClick(evt)}
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
            </div>
          </div>
          {choiseTrainingsVisible.length > 0 &&
            <ul className="special-for-you__list">
              {choiseTrainingsVisible.map(({id, trainType}) =>
                (
                  <li key ={id} className="special-for-you__item">
                    <ThumbnailTrainingPreviewComponent {...{id, trainType}} />
                  </li>
                )
              )}
            </ul>}
          {choiseTrainingsVisible.length === 0 &&
            <ThumbnailSpecGymComponent />}
        </div>
      </div>
    </section>
  );
}
