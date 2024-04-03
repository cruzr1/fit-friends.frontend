import { TrainingItemComponent, UserItemComponent } from '..';
import { TrainingItemClassApplyType, TrainingOrderedType, TrainingType } from '../../types';
import { isTrainingType, isTrainingOrderedType } from '../../helpers';
import users from '../../mocks/mock-users.json'

export default function UsersListComponent(): JSX.Element {
  return (
    <ul className="users-catalog__list">
      {users.map(({id, name, location, trainType}) =>
        <li key={id} className="users-catalog__item">
          <UserItemComponent {...{name, location, trainType}} />
        </li>
      )}
    </ul>
  )
}
