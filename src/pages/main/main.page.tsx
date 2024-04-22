import { Helmet } from 'react-helmet-async';
import { LookForCompanyComponent, PopularTrainingsComponent, SpecialForYouComponent, SpecialOffersComponent } from '../../components';
import { useAppSelector } from '../../hooks/hooks';
import { AppRoute } from '../../const';
import { selectUser } from '../../store/user/user.selectors';
import { Navigate } from 'react-router-dom';


export default function MainPage():JSX.Element {
  const user = useAppSelector(selectUser);
  if (!user) {
    return <Navigate to={AppRoute.Index} />;
  }
  return(
    <>
      <Helmet>
        <title>Главная страница — Fit friends</title>
      </Helmet>
      <h1 className="visually-hidden">FitFriends — Время находить тренировки, спортзалы и друзей спортсменов</h1>
      <SpecialForYouComponent user={user} />
      <SpecialOffersComponent />
      <PopularTrainingsComponent />
      <LookForCompanyComponent />
    </>
  );
}
