import { PropsWithChildren, ReactNode } from 'react'
import { Navigate } from 'react-router-dom';
import { AppRoute, AuthStatus, UserRole} from '../../const';
import LoadingPage from '../../pages/loading/loading.page';
import { authStatus, userRole } from '../app/app.component';

type PrivateRouteProps = PropsWithChildren;

export default function AnonymRoute ({children}: PrivateRouteProps): JSX.Element | ReactNode {
  return (
    <>
      {authStatus === AuthStatus.Unknown && <LoadingPage />}
      {authStatus === AuthStatus.Auth && userRole === UserRole.Trainer && <Navigate to={AppRoute.PersonalAccountCoach} />}
      {authStatus === AuthStatus.Auth && userRole === UserRole.User && <Navigate to={AppRoute.Main} />}
      {authStatus === AuthStatus.NoAuth && children}
    </>
  );
}
