import { Route, Routes } from 'react-router-dom';
import { AppRoute, UserRole } from '../../const';
import { HelmetProvider } from 'react-helmet-async';
import LayoutComponent from '../layout/layout.component';
import PublicRoute from '../public-route/public-route';
import PrivateRoute from '../private-route/private-route';
import PrivateRouteRole from '../private-route-role/private-route-role';
import {CreateTrainingPage, SignPage, QuestionnairePage, PersonalAccountPage, MyTrainingsPage, MyOrdersPage, FriendsListPage, MainPage, MyPurchasesPage, UserCardPage, UsersCataloguePage, TrainingCardPage, TrainingCataloguePage, IntroPage, ErrorPage} from '../../pages/index';

export default function AppComponent(): JSX.Element {
  return (
    <HelmetProvider>
      <Routes>
        <Route path={AppRoute.Index} element={<LayoutComponent />}>
          <Route index element={<IntroPage />} />
          <Route
            path={AppRoute.Signin}
            element={
              <PublicRoute>
                <SignPage isSignin />
              </PublicRoute>
            }
          />
          <Route
            path={AppRoute.Signup}
            element={
              <PublicRoute>
                <SignPage />
              </PublicRoute>
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
            path={AppRoute.PersonalAccount}
            element={
              <PrivateRoute>
                <PersonalAccountPage />
              </PrivateRoute>
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
            path={AppRoute.MyFriends}
            element={
              <PrivateRoute>
                <FriendsListPage />
              </PrivateRoute>
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
            path={AppRoute.TrainingCard}
            element={
              <PrivateRoute>
                <TrainingCardPage />
              </PrivateRoute>
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
            path={AppRoute.UserCard}
            element={<UserCardPage />}
          />
          <Route
            path={AppRoute.MyPurchases}
            element={
              <PrivateRouteRole role={UserRole.User}>
                <MyPurchasesPage />
              </PrivateRouteRole>
            }
          />
          <Route
            path={AppRoute.Error}
            element={
              <ErrorPage />
            }
          />
        </Route>
      </Routes>
    </HelmetProvider>
  );
}
