import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import { selectUser } from '../../store/user/user.selectors';
import { AppRoute } from '../../const';
import { PersonalAccountComponent } from '../../components';

export default function PersonalAccountPage(): JSX.Element {
  const user = useAppSelector(selectUser);
  if (!user) {
    return <Navigate to={AppRoute.Index} />;
  }
  return <PersonalAccountComponent user={user} />;
}
