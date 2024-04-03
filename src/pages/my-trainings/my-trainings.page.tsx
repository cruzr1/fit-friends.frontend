import { useLocation } from 'react-router-dom';
import { PaginationComponent, TrainingFilterComponent, TrainingsListComponent } from '../../components';
import { adaptPathname } from '../../helpers';
import trainings from '../../mocks/mock-trainings.json';

export default function MyTrainingsPage(): JSX.Element {
  const {pathname} = useLocation();
  return (
    <section className="inner-page">
      <div className="container">
        <div className="inner-page__wrapper">
          <h1 className="visually-hidden">Мои тренировки</h1>
          <TrainingFilterComponent isMyTrainingsPage />
          <div className="inner-page__content">
            <div className="my-trainings">
              <TrainingsListComponent classApply={adaptPathname(pathname)} trainingsList={trainings} />
              <PaginationComponent />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
