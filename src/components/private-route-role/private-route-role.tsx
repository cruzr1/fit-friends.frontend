import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoute, AuthStatus, UserRole} from '../../const';
import {LoadingPage} from '../../pages/index';
import { useAppSelector } from '../../hooks/hooks';
import { selectUser, selectUserAuthStatus } from '../../store/user/user.selectors';

type PrivateRouteProps = PropsWithChildren<{role: UserRole}>;


export default function PrivateRouteRole ({children, role}: PrivateRouteProps): JSX.Element {
  const authStatus = useAppSelector(selectUserAuthStatus);
  const user = useAppSelector(selectUser);
  return (
    <>
      {authStatus === AuthStatus.Unknown && <LoadingPage />}
      {authStatus === AuthStatus.NoAuth && <Navigate to={AppRoute.Signin} />}
      {user && authStatus === AuthStatus.Auth && role === user.role && children}
      {user && authStatus === AuthStatus.Auth && role !== user.role && user.role === UserRole.Trainer && <Navigate to={AppRoute.PersonalAccount} />}
      {user && authStatus === AuthStatus.Auth && role !== user.role && user.role === UserRole.User && <Navigate to={AppRoute.Main} />}
    </>
  );
}
