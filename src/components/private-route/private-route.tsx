import { PropsWithChildren, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../const';
import LoadingPage from '../../pages/loading/loading.page';
import { useAppSelector } from '../../hooks/hooks';
import { selectUserAuthStatus } from '../../store/user/user.selectors';

export default function PrivateRoute ({children}: PropsWithChildren): JSX.Element | ReactNode {
  const authStatus = useAppSelector(selectUserAuthStatus);
  return (
    <>
      {authStatus === AuthStatus.Unknown && <LoadingPage />}
      {authStatus === AuthStatus.NoAuth && <Navigate to={AppRoute.Signin} />}
      {(authStatus === AuthStatus.Auth || authStatus === AuthStatus.Signed) && children}
    </>
  );
}
