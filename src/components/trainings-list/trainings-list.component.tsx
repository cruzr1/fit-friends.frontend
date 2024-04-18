import { useEffect } from 'react';
import { PaginationComponent, TrainingItemComponent } from '../../components';
import { QueryTrainingsType, TrainingItemClassApplyType } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { loadTrainingsAction, loadTrainingsOrderedAction } from '../../store/training/training.actions';
import { selectCaloriesFilter, selectTake, selectPriceFilter, selectSortByOrder, selectTrainTypeFilter, selectTrainingsList, selectRatingFilter, selectTotalItems, selectDurationFilter, selectTrainingsOrderedList, selectSortByField } from '../../store/training/training.selectors';
import { MY_ORDERS_TRAININGS_COUNT } from '../../const';
import { setTake } from '../../store/training/training.slice';


type TrainingsListComponentProps = {
  classApply: TrainingItemClassApplyType;
  shouldIncludeDuration?: boolean;
  isOrdered?: boolean
}

export default function TrainingsListComponent({classApply, shouldIncludeDuration, isOrdered}: TrainingsListComponentProps): JSX.Element {
  const dispatch = useAppDispatch();
  const take = useAppSelector(selectTake);
  const totalItems = useAppSelector(selectTotalItems);
  console.log(take, totalItems);
  const priceFilter = useAppSelector(selectPriceFilter);
  const caloriesFilter = useAppSelector(selectCaloriesFilter);
  const ratingFilter = useAppSelector(selectRatingFilter);
  const trainTypeFilter = useAppSelector(selectTrainTypeFilter);
  const sortByOrder = useAppSelector(selectSortByOrder);
  const sortByField = useAppSelector(selectSortByField);
  const durationFilter= useAppSelector(selectDurationFilter);
  useEffect(() => {
    let isMounted = true;
    if (isMounted && take > 0) {
      const query: QueryTrainingsType = {
        take, priceFilter, caloriesFilter, ratingFilter, trainTypeFilter, sortByOrder
      }
      if( shouldIncludeDuration) {
        query.durationFilter = durationFilter;
      }
      if (isOrdered) {
        dispatch(loadTrainingsOrderedAction({take, sortByField, sortByOrder}));
      } else {
        dispatch(loadTrainingsAction(query));
      }
    }
    return () => {
      isMounted = false;
    }
  }, [dispatch, take, priceFilter, caloriesFilter, ratingFilter, trainTypeFilter, sortByOrder, durationFilter]);
  const trainingsList = useAppSelector(selectTrainingsList);
  const trainingsOrderedList = useAppSelector(selectTrainingsOrderedList);
  console.log(trainingsOrderedList);
  const handleShowMore = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    dispatch(setTake(Math.min(take + MY_ORDERS_TRAININGS_COUNT, totalItems)))
  };
  const handleReturn = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    dispatch(setTake(MY_ORDERS_TRAININGS_COUNT))
  };
  return (
    <>
      <ul className={`${classApply}__list`}>
        {!isOrdered && trainingsList.map(({id, price, name, trainType, calories, description, rating, backgroundImage}) =>
          <li key={id} className={`${classApply}__item`}>
            <TrainingItemComponent {...{id, price, name, trainType, calories, description, rating, backgroundImage}} />
          </li>
        )}
        {isOrdered && trainingsOrderedList.map(({training: {id, price, name, trainType, calories, description, rating, backgroundImage}, trainingsCount, trainingsSum}) =>
          <li key={id} className={`${classApply}__item`}>
            <TrainingItemComponent {...{id, price, name, trainType, calories, description, rating, backgroundImage, isOrdered, trainingsCount, trainingsSum}} />
          </li>
        )}
      </ul>
      <PaginationComponent
        take={take}
        totalItems={totalItems}
        handleShowMore={handleShowMore}
        handleReturn={handleReturn}
        classApply={classApply}
      />
    </>
  )
}
