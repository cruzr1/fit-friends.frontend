import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoute, AuthStatus, UserRole} from '../../const';
import {LoadingPage} from '../../pages/index';
import { useAppSelector } from '../../hooks/hooks';
import { selectUser, selectUserAuthStatus } from '../../store/user/user.selectors';

type PublicRouteProps = PropsWithChildren;

export default function PublicRoute ({children}: PublicRouteProps): JSX.Element {
  const authStatus = useAppSelector(selectUserAuthStatus);
  const userRole = useAppSelector(selectUser)?.role;
  return (
    <>
      {authStatus === AuthStatus.Unknown && <LoadingPage />}
      {authStatus === AuthStatus.Auth && userRole === UserRole.Trainer && <Navigate to={AppRoute.PersonalAccount} />}
      {authStatus === AuthStatus.Auth && userRole === UserRole.User && <Navigate to={AppRoute.Main} />}
      {authStatus === AuthStatus.Signed && <Navigate to={AppRoute.Quest} />}
      {authStatus === AuthStatus.NoAuth && children}
    </>
  );
}
