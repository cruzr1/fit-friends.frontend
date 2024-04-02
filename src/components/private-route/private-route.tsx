import { PropsWithChildren, ReactNode } from 'react'
import { Navigate } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../const';
import LoadingPage from '../../pages/loading/loading.page';
import { authStatus } from '../app/app.component';


export default function PrivateRoute ({children}: PropsWithChildren): JSX.Element | ReactNode {
  return (
    <>
      {authStatus === AuthStatus.Unknown && <LoadingPage />}
      {authStatus === AuthStatus.NoAuth && <Navigate to={AppRoute.Signin} />}
      {authStatus === AuthStatus.Auth && children}
    </>
  );
}
