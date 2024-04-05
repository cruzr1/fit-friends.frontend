import { PropsWithChildren, ReactNode } from 'react'
import { Navigate } from 'react-router-dom';
import { AppRoute, AuthStatus, UserRole} from '../../const';
import LoadingPage from '../../pages/loading/loading.page';
import { useAppSelector } from '../../hooks/hooks';
import { selectUser, selectUserAuthStatus } from '../../store/user/user.selectors';

type PrivateRouteProps = PropsWithChildren;

export default function AnonymRoute ({children}: PrivateRouteProps): JSX.Element | ReactNode {
  const authStatus = useAppSelector(selectUserAuthStatus);
  console.log(authStatus);
  const userRole = useAppSelector(selectUser)?.role;
  return (
    <>
      {authStatus === AuthStatus.Unknown && <LoadingPage />}
      {authStatus === AuthStatus.Auth && userRole === UserRole.Trainer && <Navigate to={AppRoute.PersonalAccountCoach} />}
      {authStatus === AuthStatus.Auth && userRole === UserRole.User && <Navigate to={AppRoute.Main} />}
      {authStatus === AuthStatus.Signed && <Navigate to={AppRoute.Quest} />}
      {authStatus === AuthStatus.NoAuth && children}
    </>
  );
}
