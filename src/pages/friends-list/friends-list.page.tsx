import { Helmet } from 'react-helmet-async';
import { BackButtonComponent, FriendsListComponent } from '../../components';
import { AppRoute, BackButtonClassApply } from '../../const';
import { useAppSelector } from '../../hooks/hooks';
import { selectUser } from '../../store/user/user.selectors';
import { Navigate } from 'react-router-dom';

export default function FriendsListPage():JSX.Element {
  const user = useAppSelector(selectUser);
  if (!user) {
    return <Navigate to={AppRoute.Index} />;
  }
  return (
    <section className="friends-list">
      <Helmet>
        <title>Список друзей — Fit friends</title>
      </Helmet>
      <div className="container">
        <div className="friends-list__wrapper">
          <BackButtonComponent classApply={BackButtonClassApply.FriendsList} />
          <div className="friends-list__title-wrapper">
            <h1 className="friends-list__title">Мои друзья</h1>
          </div>
          <FriendsListComponent user={user} />
        </div>
      </div>
    </section>
  );
}
