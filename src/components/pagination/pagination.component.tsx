import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectTake, selectTotalItems } from '../../store/training/training.selectors';
import { setTake, setTotalItems } from '../../store/training/training.slice';
import { TrainingItemClassApplyType} from '../../types';
import { STEP, TRAININGS_CATALOG_COUNT } from '../../const';

type PaginationComponentProps = {
  classApply: TrainingItemClassApplyType;
}

export default function PaginationComponent({classApply}: PaginationComponentProps): JSX.Element {
  const dispatch = useAppDispatch();
  const totalItems = useAppSelector(selectTotalItems);
  const take = useAppSelector(selectTake);
  console.log(take, totalItems, take===totalItems);
  return (
    <div className={`show-more ${classApply}__show-more`}>
      {take < totalItems &&
        <button
          className="btn show-more__button show-more__button--more"
          type="button"
          onClick={() => dispatch(setTake(Math.min(take + TRAININGS_CATALOG_COUNT, totalItems)))}
        >Показать еще</button>
      }
      {take === totalItems &&
        <button
          className="btn show-more__button show-more__button--more"
          type="button"
          onClick={() => dispatch(setTake(TRAININGS_CATALOG_COUNT))}
        >Вернуться в начало</button>
      }
  </div>
  )
}
