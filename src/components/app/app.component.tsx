import { Route, Routes } from 'react-router-dom';
import { AppRoute, UserRole } from '../../const';
import LayoutComponent from '../layout/layout.component';
import AnonymRoute from '../anonym-route/anonym-route';
import PrivateRoute from '../private-route/private-route';
import {CreateTrainingPage, SignInPage, SignUpPage, QuestionnaireCoachPage, QuestionnaireUserPage, PersonalAccountCoachPage, PersonalAccountUserPage, MyTrainingsPage, MyOrdersPage, FriendsListCoachPage, FriendsListUserPage, MainPage, MyPurchasesPage, UserCardCoachPage, UserCardUserPage, UsersCataloguePage, TrainingCardCoachPage, TrainingCardUserPage, TrainingCataloguePage, IntroPage} from '../../pages/index'

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
        path={AppRoute.QuestCoach}
        element={
          <PrivateRoute role={UserRole.Trainer}>
            <QuestionnaireCoachPage />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.QuestUser}
        element={
          <PrivateRoute role={UserRole.User}>
            <QuestionnaireUserPage />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.PersonalAccountCoach}
        element={
          <PrivateRoute role={UserRole.Trainer}>
            <PersonalAccountCoachPage />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.PersonalAccountUser}
        element={
          <PrivateRoute role={UserRole.User}>
            <PersonalAccountUserPage />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.CreateTraining}
        element={
          <PrivateRoute role={UserRole.Trainer}>
            <CreateTrainingPage />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.MyTrainings}
        element={
          <PrivateRoute role={UserRole.Trainer}>
            <MyTrainingsPage />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.MyOrders}
        element={
          <PrivateRoute role={UserRole.Trainer}>
            <MyOrdersPage />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.MyFriendsCoach}
        element={
          <PrivateRoute role={UserRole.Trainer}>
            <FriendsListCoachPage />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.MyFriendsUser}
        element={
          <PrivateRoute role={UserRole.User}>
            <FriendsListUserPage />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.Main}
        element={
          <PrivateRoute role={UserRole.User}>
            <MainPage />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.TrainingCatalogue}
        element={
          <PrivateRoute role={UserRole.User}>
            <TrainingCataloguePage />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.TrainingCardCoach}
        element={
          <PrivateRoute role={UserRole.Trainer}>
            <TrainingCardCoachPage />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.TrainingCardUser}
        element={
          <PrivateRoute role={UserRole.Trainer}>
            <TrainingCardUserPage />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.UserCatalogue}
        element={
          <PrivateRoute role={UserRole.User}>
            <UsersCataloguePage />
          </PrivateRoute>
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
          <PrivateRoute role={UserRole.User}>
            <MyPurchasesPage />
          </PrivateRoute>
        }
      />
    </Route>
  </Routes>
)
}
