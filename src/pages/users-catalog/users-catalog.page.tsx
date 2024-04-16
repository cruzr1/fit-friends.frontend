import { useLocation } from 'react-router-dom';
import { BackButtonComponent, PaginationComponent, UserFilterComponent, UsersListComponent } from '../../components';
import { adaptPathname } from '../../helpers';

export default function UsersCataloguePage(): JSX.Element {
  const {pathname} = useLocation();
  const classApply = adaptPathname(pathname);
  return (
    <section className="inner-page">
      <div className="container">
        <div className="inner-page__wrapper">
          <h1 className="visually-hidden">Каталог пользователей</h1>
          <UserFilterComponent />
          <div className="inner-page__content">
            <div className="users-catalog">
              <UsersListComponent classApply={classApply} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
