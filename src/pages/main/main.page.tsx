import { LookForCompanyComponent, PopularTrainingsComponent, SpecialForYouComponent, SpecialOffersComponent } from '../../components';


export default function MainPage():JSX.Element {
  return(
    <>
      <h1 className="visually-hidden">FitFriends — Время находить тренировки, спортзалы и друзей спортсменов</h1>
      <SpecialForYouComponent />
      <SpecialOffersComponent />
      <PopularTrainingsComponent />
      <LookForCompanyComponent />
    </>
  )
}
