import { Route, Routes } from 'react-router-dom';
import { AppRoute, UserRole, AuthStatus } from '../../const';
import LayoutComponent from '../layout/layout.component';
import AnonymRoute from '../anonym-route/anonym-route';
import PrivateRoute from '../private-route/private-route';
import PrivateRouteRole from '../private-route-role/private-route-role';
import {CreateTrainingPage, SignInPage, SignUpPage, QuestionnairePage, PersonalAccountCoachPage, PersonalAccountUserPage, MyTrainingsPage, MyOrdersPage, FriendsListCoachPage, FriendsListUserPage, MainPage, MyPurchasesPage, UserCardCoachPage, UserCardUserPage, UsersCataloguePage, TrainingCardCoachPage, TrainingCardUserPage, TrainingCataloguePage, IntroPage} from '../../pages/index'


export const userRole: string = UserRole.User;
export const authStatus: string = AuthStatus.Auth;

export default function AppComponent(): JSX.Element {
return (
  <Routes>
    <Route path={AppRoute.Index} element={<LayoutComponent />}>
      <Route index element={<IntroPage />} />
      <Route
        path={AppRoute.Signin}
        element={
          <AnonymRoute>
            <SignInPage />
          </AnonymRoute>
        }
      />
      <Route
        path={AppRoute.Signup}
        element={
          <AnonymRoute>
            <SignUpPage />
          </AnonymRoute>
        }
      />
      <Route
        path={AppRoute.Quest}
        element={
          <PrivateRoute>
            <QuestionnairePage />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.PersonalAccountCoach}
        element={
          <PrivateRouteRole role={UserRole.Trainer}>
            <PersonalAccountCoachPage />
          </PrivateRouteRole>
        }
      />
      <Route
        path={AppRoute.PersonalAccountUser}
        element={
          <PrivateRouteRole role={UserRole.User}>
            <PersonalAccountUserPage />
          </PrivateRouteRole>
        }
      />
      <Route
        path={AppRoute.CreateTraining}
        element={
          <PrivateRouteRole role={UserRole.Trainer}>
            <CreateTrainingPage />
          </PrivateRouteRole>
        }
      />
      <Route
        path={AppRoute.MyTrainings}
        element={
          <PrivateRouteRole role={UserRole.Trainer}>
            <MyTrainingsPage />
          </PrivateRouteRole>
        }
      />
      <Route
        path={AppRoute.MyOrders}
        element={
          <PrivateRouteRole role={UserRole.Trainer}>
            <MyOrdersPage />
          </PrivateRouteRole>
        }
      />
      <Route
        path={AppRoute.MyFriendsCoach}
        element={
          <PrivateRouteRole role={UserRole.Trainer}>
            <FriendsListCoachPage />
          </PrivateRouteRole>
        }
      />
      <Route
        path={AppRoute.MyFriendsUser}
        element={
          <PrivateRouteRole role={UserRole.User}>
            <FriendsListUserPage />
          </PrivateRouteRole>
        }
      />
      <Route
        path={AppRoute.Main}
        element={
          <PrivateRouteRole role={UserRole.User}>
            <MainPage />
          </PrivateRouteRole>
        }
      />
      <Route
        path={AppRoute.TrainingCatalogue}
        element={
          <PrivateRouteRole role={UserRole.User}>
            <TrainingCataloguePage />
          </PrivateRouteRole>
        }
      />
      <Route
        path={AppRoute.TrainingCardCoach}
        element={
          <PrivateRouteRole role={UserRole.Trainer}>
            <TrainingCardCoachPage />
          </PrivateRouteRole>
        }
      />
      <Route
        path={AppRoute.TrainingCardUser}
        element={
          <PrivateRouteRole role={UserRole.Trainer}>
            <TrainingCardUserPage />
          </PrivateRouteRole>
        }
      />
      <Route
        path={AppRoute.UserCatalogue}
        element={
          <PrivateRouteRole role={UserRole.User}>
            <UsersCataloguePage />
          </PrivateRouteRole>
        }
      />
      <Route
        path={AppRoute.UserCardCoach}
        element={<UserCardCoachPage />}
      />
      <Route
        path={AppRoute.UserCardUser}
        element={<UserCardUserPage />}
      />
      <Route
        path={AppRoute.MyPurchases}
        element={
          <PrivateRouteRole role={UserRole.User}>
            <MyPurchasesPage />
          </PrivateRouteRole>
        }
      />
    </Route>
  </Routes>
)
}
