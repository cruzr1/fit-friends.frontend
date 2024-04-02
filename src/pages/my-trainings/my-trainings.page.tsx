import { PaginationComponent, TrainingFilterComponent, TrainingsListComponent } from '../../components';

export default function MyTrainingsPage(): JSX.Element {
  return (
    <section className="inner-page">
      <div className="container">
        <div className="inner-page__wrapper">
          <h1 className="visually-hidden">Мои тренировки</h1>
          <TrainingFilterComponent isMyTrainingsPage />
          <div className="inner-page__content">
            <div className="my-trainings">
              <TrainingsListComponent isMyTrainingPage />
              <PaginationComponent />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
