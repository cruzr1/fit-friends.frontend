import { PropsWithChildren, ReactNode } from 'react'
import { Navigate } from 'react-router-dom';
import { AppRoute, AuthStatus} from '../../const';
import LoadingPage from '../../pages/loading/loading.page';

type PrivateRouteProps = PropsWithChildren;

export default function AnonymRoute ({children}: PrivateRouteProps): JSX.Element | ReactNode {
  const authStatus: string = AuthStatus.NoAuth;

  return (
    <>
      {authStatus === AuthStatus.Unknown && <LoadingPage />}
      {authStatus === AuthStatus.Auth && <Navigate to={AppRoute.Signin} />}
      {authStatus === AuthStatus.NoAuth && children}
    </>
  );
}
