import { useEffect } from 'react';
import { BackButtonComponent, ReviewItemComponent } from '..';
import { BackButtonClassApply } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { loadReviewsAction } from '../../store/training/training.actions';
import { selectReviews } from '../../store/training/training.selectors';
import { selectUser } from '../../store/user/user.selectors';

type ReviewsListComponentProps = {
  trainingId: string;
  isTrainer: boolean;
  handleReviewButtonClick: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function ReviewsListComponent({trainingId, isTrainer, handleReviewButtonClick}: ReviewsListComponentProps): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      dispatch(loadReviewsAction(trainingId));
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch, trainingId]);
  const reviews = useAppSelector(selectReviews);
  const user = useAppSelector(selectUser);
  const forbiddenReview = reviews.some((review) => review.authorId === user?.id);
  return (
    <aside className="reviews-side-bar" data-testid='reviewsList'>
      <BackButtonComponent classApply={BackButtonClassApply.ReviewsList} />
      <h2 className="reviews-side-bar__title">Отзывы</h2>
      <ul className="reviews-side-bar__list">
        {reviews.length === 0 &&
          <div>Список отзывов пуст</div>}
        {reviews.length > 0 && reviews.map(({id, avatar, name, comment, rating}) =>
          (
            <li key={id} className="reviews-side-bar__item">
              <ReviewItemComponent {...{name, avatar, comment, rating}} />
            </li>
          )
        )}
      </ul>
      <button
        className="btn btn--medium reviews-side-bar__button"
        type="button"
        onClick={(evt) => handleReviewButtonClick(evt)}
        disabled={isTrainer || forbiddenReview}
      >Оставить отзыв
      </button>
    </aside>

  );
}
