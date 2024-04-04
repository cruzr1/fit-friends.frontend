import { ReviewsListComponent, TrainingCardComponent } from '../../components';

export default function TrainingCardPage(): JSX.Element {

  return (
    <section className="inner-page">
      <div className="container">
        <div className="inner-page__wrapper">
          <h1 className="visually-hidden">Карточка тренировки</h1>
          <ReviewsListComponent />
          <TrainingCardComponent isEdit />
        </div>
      </div>
    </section>
  )
}
