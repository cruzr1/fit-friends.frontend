import { FriendsListItemComponent } from '..'
import { UserRole } from '../../const'
import users from '../../mocks/mock-users.json'
import { userRole } from '../app/app.component'

export default function FriendsListComponent({}): JSX.Element {
  const isTrainer = userRole === UserRole.Trainer;
  return (
    <ul className="friends-list__list">
      {users.map(({id, name, location, trainType, isReadyTrain}) =>
        <li key={id} className="friends-list__item">
          <FriendsListItemComponent {...{name, location, trainType, isReadyTrain, isTrainer}}/>
        </li>
      )}
    </ul>
  )
}
