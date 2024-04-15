import { BackButtonComponent, ReviewItemComponent } from '..';
import { BackButtonClassApply, UserRole } from '../../const';
import reviews from '../../mocks/mock-reviews.json'
import { userRole } from '../app/app.component';

export default function ReviewsListComponent(): JSX.Element {
  const isCoach = userRole === UserRole.Trainer;
  return (
    <aside className="reviews-side-bar">
      <BackButtonComponent classApply={BackButtonClassApply.ReviewsList} />
      <h2 className="reviews-side-bar__title">Отзывы</h2>
      <ul className="reviews-side-bar__list">
        {reviews.map(({id, name, comment}) =>
            <li key={id} className="reviews-side-bar__item">
              <ReviewItemComponent {...{name, comment}} />
            </li>
        )}
      </ul>
      <button className="btn btn--medium reviews-side-bar__button" type="button" disabled={isCoach}>Оставить отзыв</button>
    </aside>
  )
}
