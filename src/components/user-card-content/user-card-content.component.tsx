import { TrainType, TrainTypeCaption } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { addToFriendsAction } from '../../store/user/user.actions';
import { selectUser } from '../../store/user/user.selectors';

type UserCardContentComponentProps = {
  classApply: string;
  name: string;
  location: string;
  isCoach: boolean;
  description: string;
  trainType: string[];
  id: string;
  isReadyTrain: boolean;
  handleShowCertificatesButtonClick: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleMapLinkClick: (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

export default function UserCardContentComponent({ id, classApply, name, location, isCoach, description, trainType, handleShowCertificatesButtonClick, handleMapLinkClick, isReadyTrain }: UserCardContentComponentProps): JSX.Element {
  const dispatch = useAppDispatch();
  const handleAddToFriends = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    dispatch(addToFriendsAction(id))
  }
  const user = useAppSelector(selectUser);
  return (
    <>
      <div className={`${classApply}__content`}>
        <div className={`${classApply}__head`}>
          <h2 className={`${classApply}__title`}>{name}</h2>
        </div>
        <div className={`${classApply}__label`}>
          <a
            href="popup-user-map.html"
            onClick={(evt) => handleMapLinkClick(evt)}
          ><svg className={`${classApply}__icon-location`} width="12" height="14" aria-hidden="true">
            <use xlinkHref="#icon-location"></use>
          </svg><span>{location}</span></a>
        </div>
        <div className={`${classApply}__status-container`}>
          {isCoach &&
            <div className={`${classApply}__status ${classApply}__status--tag`}>
              <svg className={`${classApply}__icon-cup`} width="12" height="13" aria-hidden="true">
                <use xlinkHref="#icon-cup"></use>
              </svg><span>Тренер</span>
            </div>
          }
          <div className={`${classApply}__status ${classApply}__status--check`}><span>{`${isReadyTrain ? 'Готов' : 'Не готов'} ${isCoach ? 'тренировать' : 'к тренировке'}`}</span></div>
        </div>
        <div className={`${classApply}__text`}>
          <p>{description}</p>
        </div>
        {isCoach &&
          <button
            className={`btn-flat ${classApply}__sertificate`}
            type="button"
            onClick={(evt) => handleShowCertificatesButtonClick(evt)}
          >
            <svg width="12" height="13" aria-hidden="true">
              <use xlinkHref="#icon-teacher"></use>
            </svg><span>Посмотреть сертификаты</span>
          </button>
        }
        <ul className={`${classApply}__hashtag-list`}>
          {trainType.map((type) =>
            <li key={type} className={`${classApply}__hashtag-item`}>
              <div className="hashtag"><span>#{TrainTypeCaption[type as TrainType]}</span></div>
            </li>
          )}
        </ul>
        <button
          className={`btn ${classApply}__btn`}
          type="button"
          onClick={(evt) => handleAddToFriends(evt)}
        >{user?.friends?.includes(id) ? 'Удалить из друзей' : 'Добавить в друзья'}</button>
      </div>
      <div className={`${classApply}__gallary`}>
        <ul className={`${classApply}__gallary-list`}>
          <li className={`${classApply}__gallary-item`}><img src="/img/content/user-coach-photo1.jpg" srcSet="/img/content/user-coach-photo1@2x.jpg 2x" width="334" height="573" alt="photo1" />
          </li>
          <li className={`${classApply}__gallary-item`}><img src="/img/content/user-coach-photo2.jpg" srcSet="/img/content/user-coach-photo2@2x.jpg 2x" width="334" height="573" alt="photo2" />
          </li>
        </ul>
      </div>

    </>
  )
}
