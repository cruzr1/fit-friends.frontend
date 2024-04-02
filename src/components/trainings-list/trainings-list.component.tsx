import { TrainingItemComponent } from '../../components';
import trainings from '../../mocks/mock-trainings.json';

type TrainingsListComponentProps = {
  isMyTrainingPage?: boolean;
}

export default function TrainingsListComponent({isMyTrainingPage}: TrainingsListComponentProps): JSX.Element {
  const classApply = isMyTrainingPage ? 'my-trainings': 'training-catalog'
  return (
    <ul className={`${classApply}__list`}>
      {trainings.map(({price, name, trainType, calories, description, rating, backgroundImage}) =>
        <TrainingItemComponent {...{price, name, trainType, calories, description, rating, backgroundImage}} />
      )}
    </ul>
  )
}
