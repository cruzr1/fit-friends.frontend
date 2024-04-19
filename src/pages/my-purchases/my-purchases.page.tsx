import { useLocation } from 'react-router-dom';
import { BackButtonComponent, TrainingsListComponent } from '../../components';
import { adaptPathname } from '../../helpers';
import { BackButtonClassApply, CATALOG_COUNT } from '../../const';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setIsActiveTrainings, setTake } from '../../store/training/training.slice';
import { selectIsActiveTrainings } from '../../store/training/training.selectors';
import { Helmet } from 'react-helmet-async';

export default function MyPurchasesPage(): JSX.Element {
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
  }, [dispatch]);
  const isActiveTrainings = useAppSelector(selectIsActiveTrainings);
  return (
    <section className="my-purchases">
      <Helmet>
        <title>Мои покупки — Fit friends</title>
      </Helmet>
      <div className="container">
        <div className="my-purchases__wrapper">
          <BackButtonComponent classApply={BackButtonClassApply.MyPurchases} />
          <div className="my-purchases__title-wrapper">
            <h1 className="my-purchases__title">Мои покупки</h1>
            <div className="my-purchases__controls">
              <div className="custom-toggle custom-toggle--switch custom-toggle--switch-right my-purchases__switch" data-validate-type="checkbox">
                <label>
                  <input
                    type="checkbox"
                    value="user-agreement-1"
                    name="user-agreement"
                    checked={isActiveTrainings}
                    onChange={() => dispatch(setIsActiveTrainings(!isActiveTrainings))}
                  /><span className="custom-toggle__icon">
                    <svg width="9" height="6" aria-hidden="true">
                      <use xlinkHref="#arrow-check"></use>
                    </svg></span><span className="custom-toggle__label">Только активные</span>
                </label>
              </div>
            </div>
          </div>
          <TrainingsListComponent classApply={classApply} isPurchased isActiveTrainings={isActiveTrainings} />
        </div>
      </div>
    </section>
  )
}
