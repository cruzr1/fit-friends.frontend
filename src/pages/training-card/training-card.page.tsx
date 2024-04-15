import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ReviewsListComponent, TrainingCardComponent } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectUser } from '../../store/user/user.selectors';
import { TrainingType, UserType } from '../../types';
import { UserRole } from '../../const';
import { selectTrainer, selectTraining } from '../../store/training/training.selectors';
import { loadTrainingAction } from '../../store/training/training.actions';


export default function TrainingCardPage(): JSX.Element {
  const trainingId = useParams().trainingId as string;
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isTrainer = user?.role === UserRole.Trainer;
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      dispatch(loadTrainingAction(trainingId));
    }
    return () => {
      isMounted = false;
    }
  }, [dispatch]);
  const training = useAppSelector(selectTraining) as TrainingType;
  const loadTrainer = useAppSelector(selectTrainer);
  const trainer = isTrainer ? user : loadTrainer;
  return (
    <section className="inner-page">
      <div className="container">
        <div className="inner-page__wrapper">
          <h1 className="visually-hidden">Карточка тренировки</h1>
          <ReviewsListComponent />
          {training && trainer && <TrainingCardComponent training={training} trainer={trainer} isTrainer={isTrainer} />}
        </div>
      </div>
    </section>
  )
}
