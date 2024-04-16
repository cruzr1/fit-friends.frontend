import { useEffect } from 'react';
import { PaginationComponent, TrainingItemComponent } from '../../components';
import { TrainingItemClassApplyType } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { loadTrainingsAction } from '../../store/training/training.actions';
import { selectCaloriesFilter, selectTake, selectPriceFilter, selectSortByOrder, selectTrainTypeFilter, selectTrainingsList, selectRatingFilter, selectTotalItems } from '../../store/training/training.selectors';
import { CATALOG_COUNT } from '../../const';
import { setTake } from '../../store/training/training.slice';


type TrainingsListComponentProps = {
  classApply: TrainingItemClassApplyType;
}

export default function TrainingsListComponent({classApply}: TrainingsListComponentProps): JSX.Element {
  const dispatch = useAppDispatch();
  const take = useAppSelector(selectTake);
  const totalItems = useAppSelector(selectTotalItems);
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
  const handleShowMore = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    dispatch(setTake(Math.min(take + CATALOG_COUNT, totalItems)))
  };
  const handleReturn = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    dispatch(setTake(CATALOG_COUNT))
  };
  return (
    <>
      <ul className={`${classApply}__list`}>
        {trainingsList && trainingsList.map(({id, price, name, trainType, calories, description, rating, backgroundImage}) =>
          <li key={id} className={`${classApply}__item`}>
            <TrainingItemComponent {...{id, price, name, trainType, calories, description, rating, backgroundImage}} />
          </li>
        )}
        {/* {isTrainingOrderedType(trainingsList) && trainingsList.map(({training: {id, price, name, trainType, calories, description, rating, backgroundImage}, trainingsCount, trainingsSum}) =>
          <li key={id} className={`${classApply}__item`}>
            <TrainingItemComponent {...{price, name, trainType, calories, description, rating, backgroundImage, isOrdered, trainingsCount, trainingsSum}} />
          </li>
        )} */}
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
