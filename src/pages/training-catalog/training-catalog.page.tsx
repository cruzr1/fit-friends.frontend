import { useLocation } from 'react-router-dom';
import { PaginationComponent, TrainingFilterComponent, TrainingsListComponent } from '../../components';
import { adaptPathname } from '../../helpers';
import trainings from '../../mocks/mock-trainings.json';

export default function TrainingsCataloguePage(): JSX.Element {
  const {pathname} = useLocation();
  return (
    <section className="inner-page">
      <div className="container">
        <div className="inner-page__wrapper">
          <h1 className="visually-hidden">Каталог тренировок</h1>
          <TrainingFilterComponent />
          <div className="training-catalog">
          <TrainingsListComponent classApply={adaptPathname(pathname)} trainingsList={trainings} />
            <PaginationComponent />
          </div>
        </div>
      </div>
    </section>
  )
}
