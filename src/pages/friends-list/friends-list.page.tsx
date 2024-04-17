import { BackButtonComponent, FriendsListComponent } from '../../components';
import { BackButtonClassApply } from '../../const';

export default function FriendsListPage():JSX.Element {
  return (
    <section className="friends-list">
      <div className="container">
        <div className="friends-list__wrapper">
          <BackButtonComponent classApply={BackButtonClassApply.FriendsList} />
          <div className="friends-list__title-wrapper">
            <h1 className="friends-list__title">Мои друзья</h1>
          </div>
          <FriendsListComponent />
        </div>
      </div>
    </section>
  )
}
