import { useLocation } from 'react-router-dom';
import { BackButtonComponent, FriendsListComponent, PaginationComponent } from '../../components';
import { adaptPathname } from '../../helpers';


export default function FriendsListPage():JSX.Element {
  const {pathname} = useLocation();
  const classApply=adaptPathname(pathname);
  return (
    <section className="friends-list">
      <div className="container">
        <div className="friends-list__wrapper">
          <BackButtonComponent classApply={classApply} />
          <div className="friends-list__title-wrapper">
            <h1 className="friends-list__title">Мои друзья</h1>
          </div>
          <FriendsListComponent />
          <PaginationComponent classApply={classApply} />
        </div>
      </div>
    </section>
  )
}
