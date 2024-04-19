import { Helmet } from 'react-helmet-async';
import { LookForCompanyComponent, PopularTrainingsComponent, SpecialForYouComponent, SpecialOffersComponent } from '../../components';


export default function MainPage():JSX.Element {
  return(
    <>
      <Helmet>
        <title>Главная страница — Fit friends</title>
      </Helmet>
      <h1 className="visually-hidden">FitFriends — Время находить тренировки, спортзалы и друзей спортсменов</h1>
      <SpecialForYouComponent />
      <SpecialOffersComponent />
      <PopularTrainingsComponent />
      <LookForCompanyComponent />
    </>
  )
}
