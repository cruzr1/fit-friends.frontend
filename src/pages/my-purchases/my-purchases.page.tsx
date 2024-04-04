import { useLocation } from 'react-router-dom';
import { BackButtonComponent, PaginationComponent, PurchasesControlsComponent, TrainingsListComponent } from '../../components';
import { adaptPathname } from '../../helpers';
import trainings from '../../mocks/mock-trainings.json';
import { BackButtonClassApply } from '../../const';

export default function MyPurchasesPage(): JSX.Element {
  const {pathname} = useLocation();
  const classApply = adaptPathname(pathname);
  return (
    <section className="my-purchases">
      <div className="container">
        <div className="my-purchases__wrapper">
          <BackButtonComponent classApply={BackButtonClassApply.MyPurchases} />
          <div className="my-purchases__title-wrapper">
            <h1 className="my-purchases__title">Мои покупки</h1>
            <PurchasesControlsComponent />
          </div>
          <TrainingsListComponent classApply={classApply} trainingsList={trainings}/>
            <PaginationComponent classApply={classApply} />
        </div>
      </div>
    </section>
  )
}
