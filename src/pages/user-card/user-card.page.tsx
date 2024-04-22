import { UserCardComponent } from '../../components';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { useEffect } from 'react';
import { loadUserItemAction } from '../../store/user/user.actions';
import { isStatusFulfilled, isStatusPending } from '../../helpers';
import { selectLoadUserItemStatus } from '../../store/user/user.selectors';
import LoadingPage from '../loading/loading.page';

export default function UserCardPage(): JSX.Element {
  const userId = useParams().userId as string;
  const dispatch = useAppDispatch();
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      dispatch(loadUserItemAction(userId));
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch, userId]);
  const isUserItemDataPending = isStatusPending(useAppSelector(selectLoadUserItemStatus));
  const isUserItemDataFulfilled = isStatusFulfilled(useAppSelector(selectLoadUserItemStatus));
  return(
    <>
      {isUserItemDataPending && <LoadingPage />};
      {isUserItemDataFulfilled && <UserCardComponent userId={userId} />};
    </>
  );
}
