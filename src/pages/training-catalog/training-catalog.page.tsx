import { useLocation } from 'react-router-dom';
import { TrainingFilterComponent, TrainingsListComponent } from '../../components';
import { adaptPathname } from '../../helpers';
import { useAppDispatch } from '../../hooks/hooks';
import { useEffect } from 'react';
import { setTake } from '../../store/training/training.slice';
import { CATALOG_COUNT } from '../../const';
import { Helmet } from 'react-helmet-async';

export default function TrainingsCataloguePage(): JSX.Element {
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
    };
  }, [dispatch ]);
  return (
    <section className="inner-page">
      <Helmet>
        <title>Каталог тренировок — Fit friends</title>
      </Helmet>
      <div className="container">
        <div className="inner-page__wrapper">
          <h1 className="visually-hidden">Каталог тренировок</h1>
          <TrainingFilterComponent />
          <div className="training-catalog">
            <TrainingsListComponent classApply={classApply} />
          </div>
        </div>
      </div>
    </section>
  );
}
