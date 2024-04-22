import { useEffect, useState } from 'react';
import { INITIAL_RATING, INITIAL_COMMENT, RATING_LIST, errorStyle, KEY_ESCAPE } from '../../const';
import { useAppDispatch } from '../../hooks/hooks';
import { postReviewAction } from '../../store/training/training.actions';
import { blockPage, isCommentValid, unblockPage } from '../../helpers';

type PopupReviewComponentProps = {
  trainingId: string;
  handlePopupClose: () => void;
}

export default function PopupReviewComponent({trainingId, handlePopupClose}: PopupReviewComponentProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [rating, setRating] = useState<number>(INITIAL_RATING);
  const [comment, setComment] = useState<string>(INITIAL_COMMENT);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  useEffect(() => {
    let isMounted = true;
    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === KEY_ESCAPE) {
        handlePopupClose();
      }
    };
    if (isMounted) {
      blockPage();
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      isMounted = false;
      document.removeEventListener('keydown', handleKeyDown);
      unblockPage();
    };
  }, [handlePopupClose]);
  const handleSubmitButtonClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    setIsSubmit(true);
    if (isCommentValid(comment)) {
      dispatch(postReviewAction({trainingId, rating, comment}));
      handlePopupClose();
    }
  };
  const handleCloseButtonClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    setComment(INITIAL_COMMENT);
    setRating(INITIAL_RATING);
    setIsSubmit(false);
    handlePopupClose();
  };

  return (
    <div className="popup-form popup-form--feedback">
      <section className="popup">
        <div className="popup__wrapper">
          <div className="popup-head">
            <h2 className="popup-head__header">Оставить отзыв</h2>
            <button
              className="btn-icon btn-icon--outlined btn-icon--big"
              type="button"
              aria-label="close"
              onClick={(evt) => handleCloseButtonClick(evt)}
            >
              <svg width="20" height="20" aria-hidden="true">
                <use xlinkHref="#icon-cross"></use>
              </svg>
            </button>
          </div>
          <div className="popup__content popup__content--feedback">
            <h3 className="popup__feedback-title">Оцените тренировку</h3>
            <ul className="popup__rate-list">
              {RATING_LIST.map((rate) =>
                (
                  <li key={rate} className="popup__rate-item">
                    <div className="popup__rate-item-wrap">
                      <label>
                        <input
                          type="radio"
                          name="оценка тренировки"
                          aria-label={`"оценка ${rate}."`}
                          value={rate}
                          checked={rate === rating}
                          onChange={(evt) => setRating(parseInt(evt.target.value, 10))}
                        /><span className="popup__rate-number" >{rate}</span>
                      </label>
                    </div>
                  </li>
                )
              )}
            </ul>
            <div className="popup__feedback">
              <h3 className="popup__feedback-title popup__feedback-title--text">Поделитесь своими впечатлениями о тренировке</h3>
              <div className="popup__feedback-textarea">
                <div className="custom-textarea">
                  <label>
                    <textarea
                      name="description"
                      placeholder=" "
                      value={comment}
                      onChange={(evt) => setComment(evt.target.value)}
                    >
                    </textarea>
                    {!isCommentValid(comment) && isSubmit && <p style={errorStyle}>Длина комментария должна составлять от 100 до 1024 символов.</p>}
                  </label>
                </div>
              </div>
            </div>
            <div className="popup__button">
              <button
                className="btn"
                type="button"
                onClick={(evt) => handleSubmitButtonClick(evt)}
              >Продолжить
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
