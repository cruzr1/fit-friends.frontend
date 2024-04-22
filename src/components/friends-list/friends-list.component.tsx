import { FriendsListItemComponent, PaginationComponent } from '..';
import { CATALOG_COUNT, NULL_VALUE, UserRole } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectApplicationsList, selectUserFriends, selectUsersTake, selectUsersTotalItems } from '../../store/user/user.selectors';
import { useLocation } from 'react-router-dom';
import { adaptPathname, findLatestApplication, findReviewingApplication } from '../../helpers';
import { useEffect } from 'react';
import { loadAuthorApplicationsAction, loadUserApplicationsAction, loadUserFriendsAction } from '../../store/user/user.actions';
import { setUsersTake } from '../../store/user/user.slice';
import { UserType } from '../../types';

type FriendsListComponentProps = {
  user: UserType;
}

export default function FriendsListComponent({user}: FriendsListComponentProps): JSX.Element {
  const {pathname} = useLocation();
  const classApply = adaptPathname(pathname);
  const dispatch = useAppDispatch();
  const {id: userId, role} = user;
  const take = useAppSelector(selectUsersTake);
  const isCoach = role === UserRole.Trainer;
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      dispatch(loadUserFriendsAction(take));
      if (isCoach) {
        dispatch(loadUserApplicationsAction(userId));
      } else {
        dispatch(loadAuthorApplicationsAction(userId));
      }
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch, take, isCoach, userId]);
  const friends = useAppSelector(selectUserFriends);
  const applications = useAppSelector(selectApplicationsList);
  const findApplication = (friendId: string) => isCoach ? findReviewingApplication(friendId, applications) : findLatestApplication(friendId, applications);
  const totalItems = useAppSelector(selectUsersTotalItems);
  const handleShowMore = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    dispatch(setUsersTake(Math.min(take + CATALOG_COUNT, totalItems)));
  };
  const handleReturn = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    dispatch(setUsersTake(CATALOG_COUNT));
  };

  return (
    <>
      {friends.length > NULL_VALUE &&
        <>
          <ul className="friends-list__list">
            {friends.map(({id: friendId, name, location, trainType, isReadyTrain, role: friendRole}) =>
              (
                <li key={friendId} className="friends-list__item">
                  <FriendsListItemComponent {...{
                    userId,
                    name,
                    location,
                    trainType,
                    isReadyTrain,
                    role: friendRole,
                    userRole: user.role,
                    application: findApplication(friendId),
                  }}
                  />
                </li>
              )
            )}
          </ul>
          <PaginationComponent
            take={take}
            totalItems={totalItems}
            handleShowMore={handleShowMore}
            handleReturn={handleReturn}
            classApply={classApply}
          />
        </>}
      {friends.length === NULL_VALUE &&
        <div>Пока друзей нет.</div>}
    </>
  );
}
