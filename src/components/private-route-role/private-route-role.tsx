import { PropsWithChildren, ReactNode } from 'react'
import { Navigate } from 'react-router-dom';
import { AppRoute, AuthStatus, UserRole} from '../../const';
import LoadingPage from '../../pages/loading/loading.page';
import { userRole } from '../app/app.component';

type PrivateRouteProps = PropsWithChildren<{role: UserRole}>;


export default function PrivateRouteRole ({children, role}: PrivateRouteProps): JSX.Element | ReactNode {
  const authStatus: string = AuthStatus.Auth;
  return (
    <>
      {authStatus === AuthStatus.Unknown && <LoadingPage />}
      {authStatus === AuthStatus.NoAuth && <Navigate to={AppRoute.Signin} />}
      {authStatus === AuthStatus.Auth && role === userRole && children}
    </>
  );
}
