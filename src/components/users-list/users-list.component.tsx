import { UserItemComponent, PaginationComponent } from '..';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectUsersList, selectUsersTake, selectLevelFilter, selectLocationFilter, selectRoleFilter, selectTrainTypeFilter, selectUsersTotalItems } from '../../store/user/user.selectors';
import { useEffect } from 'react';
import { loadUsersListAction } from '../../store/user/user.actions';
import { setUsersTake } from '../../store/user/user.slice';
import { CATALOG_COUNT } from '../../const';
import { TrainingItemClassApplyType } from '../../types';

type UsersListComponentProps = {
  classApply: TrainingItemClassApplyType;
}

export default function UsersListComponent({classApply}: UsersListComponentProps): JSX.Element {
  const dispatch = useAppDispatch();
  const usersTake = useAppSelector(selectUsersTake);
  const usersTotalItems = useAppSelector(selectUsersTotalItems);
  const locationFilter = useAppSelector(selectLocationFilter);
  const trainTypeFilter = useAppSelector(selectTrainTypeFilter);
  const levelFilter = useAppSelector(selectLevelFilter);
  const roleFilter = useAppSelector(selectRoleFilter);
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      dispatch(loadUsersListAction({
        take: usersTake,
        location: locationFilter,
        trainType: trainTypeFilter,
        level: levelFilter,
        role: roleFilter,
      }));
    }
    return () => {
      isMounted = false;
    }
  }, [dispatch, usersTake, locationFilter, trainTypeFilter, levelFilter, roleFilter]);
  const users = useAppSelector(selectUsersList);
  const handleShowMore = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    dispatch(setUsersTake(Math.min(usersTake + CATALOG_COUNT, usersTotalItems)))
  };
  const handleReturn = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    dispatch(setUsersTake(CATALOG_COUNT))
  };
  return (
    <>
      <ul className="users-catalog__list">
        {users && users.map(({id, name, location, trainType = [], role, avatar}) =>
          <li key={id} className="users-catalog__item">
            <UserItemComponent {...{id, name, location, trainType, role, avatar}} />
          </li>
        )}
      </ul>
      <PaginationComponent
        take={usersTake}
        totalItems={usersTotalItems}
        handleShowMore={handleShowMore}
        handleReturn={handleReturn}
        classApply={classApply}
      />
    </>
  )
}
