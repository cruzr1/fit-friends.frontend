import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PopupReviewComponent, ReviewsListComponent, TrainingCardComponent } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectUser } from '../../store/user/user.selectors';
import { TrainingType } from '../../types';
import { UserRole } from '../../const';
import { selectTrainer, selectTraining } from '../../store/training/training.selectors';
import { loadTrainingAction } from '../../store/training/training.actions';
import PopupBuyComponent from '../../components/popup-buy/popup-buy.component';
import { Helmet } from 'react-helmet-async';


export default function TrainingCardPage(): JSX.Element {
  const trainingId = useParams().trainingId as string;
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isTrainer = user?.role === UserRole.Trainer;
  const [showReview, setShowReview] = useState<boolean>(false);
  const [showBuy, setShowBuy] = useState<boolean>(false);
  const handlePopupClose = () => {
    if (showReview) {
      setShowReview(false);
    }
    if (showBuy) {
      setShowBuy(false);
    }
  };
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      dispatch(loadTrainingAction(trainingId));
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch, trainingId]);
  const training = useAppSelector(selectTraining) as TrainingType;
  const loadTrainer = useAppSelector(selectTrainer);
  const trainer = isTrainer ? user : loadTrainer;
  const handleReviewButtonClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    setShowReview(true);
  };
  const handleBuyButtonClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    setShowBuy(true);
  };


  return (
    <>
      <section className="inner-page">
        <Helmet>
          <title>Карточка тренировки — Fit friends</title>
        </Helmet>
        <div className="container">
          <div className="inner-page__wrapper">
            <h1 className="visually-hidden">Карточка тренировки</h1>
            <ReviewsListComponent trainingId={trainingId} isTrainer={isTrainer} handleReviewButtonClick={handleReviewButtonClick} />
            {training && trainer && <TrainingCardComponent training={training} trainer={trainer} handleBuyButtonClick={handleBuyButtonClick} isTrainer={isTrainer} />}
          </div>
        </div>
      </section>
      {showReview &&
        <PopupReviewComponent trainingId={trainingId} handlePopupClose={handlePopupClose} />}
      {showBuy && training.price > 0 &&
        <PopupBuyComponent training={training} handlePopupClose={handlePopupClose} />};
    </>
  );
}
