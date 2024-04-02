import { PaginationComponent, TrainingFilterComponent, TrainingsListComponent } from '../../components';

export default function TrainingsCataloguePage(): JSX.Element {
  return (
    <section className="inner-page">
      <div className="container">
        <div className="inner-page__wrapper">
          <h1 className="visually-hidden">Каталог тренировок</h1>
          <TrainingFilterComponent />
          <div className="training-catalog">
            <TrainingsListComponent />
            <PaginationComponent />
          </div>
        </div>
      </div>
    </section>
  )
}
