import { TrainingItemComponent } from '..';
import trainings from '../../mocks/mock-trainings.json';
import { TrainingItemClassApplyType } from '../../types';

type OrdersListComponentProps = {
  classApply: TrainingItemClassApplyType;
}

export default function OrdersListComponent({classApply}: OrdersListComponentProps): JSX.Element {
  return (
    <ul className={`${classApply}__list`}>
      {trainings.map(({price, name, trainType, calories, description, rating, backgroundImage}) =>
        <TrainingItemComponent {...{price, name, trainType, calories, description, rating, backgroundImage}} />
      )}
    </ul>
  )
}
