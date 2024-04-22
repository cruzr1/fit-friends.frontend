import { useLocation } from 'react-router-dom';
import { UserFilterComponent, UsersListComponent } from '../../components';
import { adaptPathname } from '../../helpers';
import { Helmet } from 'react-helmet-async';

export default function UsersCataloguePage(): JSX.Element {
  const {pathname} = useLocation();
  const classApply = adaptPathname(pathname);
  return (
    <section className="inner-page">
      <Helmet>
        <title>Каталог пользователей — Fit friends</title>
      </Helmet>
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
  );
}
