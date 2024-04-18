import { useLocation } from 'react-router-dom';
import { PaginationComponent, TrainingFilterComponent, TrainingsListComponent } from '../../components';
import { adaptPathname } from '../../helpers';
import { useAppDispatch } from '../../hooks/hooks';
import { useEffect } from 'react';
import { CATALOG_COUNT } from '../../const';
import { setTake } from '../../store/training/training.slice';

export default function MyTrainingsPage(): JSX.Element {
  const {pathname} = useLocation();
  const classApply = adaptPathname(pathname);
  const dispatch = useAppDispatch();
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      dispatch(setTake(CATALOG_COUNT));
    }
    return () => {
      isMounted = false;
    }
  }, [dispatch ]);
  return (
    <section className="inner-page">
      <div className="container">
        <div className="inner-page__wrapper">
          <h1 className="visually-hidden">Мои тренировки</h1>
          <TrainingFilterComponent isMyTrainingsPage />
          <div className="inner-page__content">
            <div className="my-trainings">
              <TrainingsListComponent classApply={classApply} shouldIncludeDuration />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
