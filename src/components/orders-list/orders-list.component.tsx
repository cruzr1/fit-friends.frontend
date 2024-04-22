import { TrainingItemComponent } from '..';
import trainings from '../../mocks/mock-trainings.json';
import { TrainingItemClassApplyType } from '../../types';

type OrdersListComponentProps = {
  classApply: TrainingItemClassApplyType;
}

export default function OrdersListComponent({classApply}: OrdersListComponentProps): JSX.Element {
  return (
    <ul className={`${classApply}__list`}>
      {trainings.map(({id, price, name, trainType, calories, description, rating, backgroundImage}) =>
        (
          <li key={id} className={`${classApply}__item`}>
            <TrainingItemComponent {...{id, price, name, trainType, calories, description, rating, backgroundImage}} />
          </li>
        )
      )}
    </ul>
  );
}
