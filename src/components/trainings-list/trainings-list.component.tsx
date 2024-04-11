import { useEffect } from 'react';
import { TrainingItemComponent } from '../../components';
import { TrainingItemClassApplyType } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { loadTrainingsAction } from '../../store/training/training.actions';
import { selectCaloriesFilter, selectTake, selectPriceFilter, selectSortByOrder, selectTrainTypeFilter, selectTrainingsList, selectRatingFilter } from '../../store/training/training.selectors';

type TrainingsListComponentProps = {
  classApply: TrainingItemClassApplyType;
}

export default function TrainingsListComponent({classApply}: TrainingsListComponentProps): JSX.Element {
  const dispatch = useAppDispatch();
  const take = useAppSelector(selectTake);
  const priceFilter = useAppSelector(selectPriceFilter);
  const caloriesFilter = useAppSelector(selectCaloriesFilter);
  const ratingFilter = useAppSelector(selectRatingFilter);
  const trainTypeFilter = useAppSelector(selectTrainTypeFilter);
  const sortByOrder = useAppSelector(selectSortByOrder);
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      dispatch(loadTrainingsAction({
        take, priceFilter, caloriesFilter, ratingFilter, trainTypeFilter, sortByOrder}));
    }
    return () => {
      isMounted = false;
    }
  }, [dispatch, take, priceFilter, caloriesFilter, ratingFilter, trainTypeFilter, sortByOrder]);
  const trainingsList = useAppSelector(selectTrainingsList);
  console.log(trainingsList);
  return (
    <ul className={`${classApply}__list`}>
      {trainingsList.map(({id, price, name, trainType, calories, description, rating, backgroundImage}) =>
        <li key={id} className={`${classApply}__item`}>
          <TrainingItemComponent {...{price, name, trainType, calories, description, rating, backgroundImage}} />
        </li>
      )}
      {/* {isTrainingOrderedType(trainingsList) && trainingsList.map(({training: {id, price, name, trainType, calories, description, rating, backgroundImage}, trainingsCount, trainingsSum}) =>
        <li key={id} className={`${classApply}__item`}>
          <TrainingItemComponent {...{price, name, trainType, calories, description, rating, backgroundImage, isOrdered, trainingsCount, trainingsSum}} />
        </li>
      )} */}
    </ul>
  )
}
