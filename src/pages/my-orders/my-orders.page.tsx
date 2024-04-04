import { useLocation } from 'react-router-dom';
import { BackButtonComponent, PaginationComponent, SortOrdersComponent, TrainingsListComponent } from '../../components'
import { adaptPathname } from '../../helpers';
import trainingsOrdered from '../../mocks/mock-ordered-trainings.json'
import { BackButtonClassApply } from '../../const';

export default function MyOrdersPage(): JSX.Element {
  const {pathname} = useLocation();
  const classApply = adaptPathname(pathname);
  return (
    <section className="my-orders">
      <div className="container">
        <div className="my-orders__wrapper">
          <BackButtonComponent classApply={BackButtonClassApply.MyOrders} />
          <div className="my-orders__title-wrapper">
            <h1 className="my-orders__title">Мои заказы</h1>
            <SortOrdersComponent />
          </div>
          <TrainingsListComponent classApply={classApply} trainingsList={trainingsOrdered} />
          <PaginationComponent  classApply={classApply} />
        </div>
      </div>
    </section>
  )
}
