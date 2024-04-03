import { TrainingItemComponent } from '../../components';
import { TrainingItemClassApplyType, TrainingOrderedType, TrainingType } from '../../types';
import { isTrainingType, isTrainingOrderedType } from '../../helpers';

type TrainingsListComponentProps = {
  classApply: TrainingItemClassApplyType;
  trainingsList: TrainingType[] | TrainingOrderedType[]
}

export default function TrainingsListComponent({classApply, trainingsList}: TrainingsListComponentProps): JSX.Element {

  const isOrdered = isTrainingOrderedType(trainingsList) ? true : false;
  return (
    <ul className={`${classApply}__list`}>
      {isTrainingType(trainingsList) && trainingsList.map(({id, price, name, trainType, calories, description, rating, backgroundImage}) =>
        <li key={id} className={`${classApply}__item`}>
          <TrainingItemComponent {...{price, name, trainType, calories, description, rating, backgroundImage}} />
        </li>
      )}
      {isTrainingOrderedType(trainingsList) && trainingsList.map(({training: {id, price, name, trainType, calories, description, rating, backgroundImage}, trainingsCount, trainingsSum}) =>
        <li key={id} className={`${classApply}__item`}>
          <TrainingItemComponent {...{price, name, trainType, calories, description, rating, backgroundImage, isOrdered, trainingsCount, trainingsSum}} />
        </li>
      )}
    </ul>
  )
}
