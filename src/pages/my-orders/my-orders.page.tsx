import { useLocation } from 'react-router-dom';
import { BackButtonComponent, SortOrdersComponent, TrainingsListComponent } from '../../components'
import { adaptPathname } from '../../helpers';
import { BackButtonClassApply, MY_ORDERS_TRAININGS_COUNT } from '../../const';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { setTake } from '../../store/training/training.slice';
import { Helmet } from 'react-helmet-async';

export default function MyOrdersPage(): JSX.Element {
  const {pathname} = useLocation();
  const classApply = adaptPathname(pathname);
  const dispatch = useAppDispatch();
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      dispatch(setTake(MY_ORDERS_TRAININGS_COUNT));
    }
    return () => {
      isMounted = false;
    }
  }, [dispatch ]);
  return (
    <section className="my-orders">
      <Helmet>
        <title>Мои заказы — Fit friends</title>
      </Helmet>
      <div className="container">
        <div className="my-orders__wrapper">
          <BackButtonComponent classApply={BackButtonClassApply.MyOrders} />
          <div className="my-orders__title-wrapper">
            <h1 className="my-orders__title">Мои заказы</h1>
            <SortOrdersComponent />
          </div>
          <TrainingsListComponent classApply={classApply}  isOrdered />
        </div>
      </div>
    </section>
  )
}
