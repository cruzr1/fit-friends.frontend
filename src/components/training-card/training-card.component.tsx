import users from '../../mocks/mock-users.json';
import training from '../../mocks/mock-trainings.json';

type TrainingCardComponentProps = {
  isEdit?: boolean;
}

export default function TrainingCardComponent({isEdit}: TrainingCardComponentProps): JSX.Element {
  const {name: trainerName} = users[1];
  const {name, description, rating, trainType, calories, gender, duration, price, videoURL} = training[0];
  return (
    <div className={`training-card ${isEdit ? 'training-card--edit': ''}`}>
      <div className="training-info">
        <h2 className="visually-hidden">Информация о тренировке</h2>
        <div className="training-info__header">
          <div className="training-info__coach">
            <div className="training-info__photo">
              <picture>
                <source type="image/webp" srcSet="markup/img/content/avatars/coaches//photo-1.webp, markup/img/content/avatars/coaches//photo-1@2x.webp 2x" /><img src="markup/img/content/avatars/coaches//photo-1.png" srcSet="markup/img/content/avatars/coaches//photo-1@2x.png 2x" width="64" height="64" alt="Изображение тренера" />
              </picture>
            </div>
            <div className="training-info__coach-info"><span className="training-info__label">Тренер</span><span className="training-info__name">{trainerName}</span></div>
          </div>
          {!isEdit &&
            <button className="btn-flat btn-flat--light training-info__edit training-info__edit--edit" type="button">
              <svg width="12" height="12" aria-hidden="true">
                <use xlinkHref="#icon-edit"></use>
              </svg><span>Редактировать</span>
            </button>
          }
          {isEdit &&
            <button className="btn-flat btn-flat--light btn-flat--underlined training-info__edit training-info__edit--save" type="button">
              <svg width="12" height="12" aria-hidden="true">
                <use xlinkHref="#icon-edit"></use>
              </svg><span>Сохранить</span>
            </button>
          }
        </div>
        <div className="training-info__main-content">
          <form action="#" method="get">
            <div className="training-info__form-wrapper">
              <div className="training-info__info-wrapper">
                <div className="training-info__input training-info__input--training">
                  <label><span className="training-info__label">Название тренировки</span>
                    <input type="text" name="training" value={name} disabled={!isEdit} />
                  </label>
                  <div className="training-info__error">Обязательное поле</div>
                </div>
                <div className="training-info__textarea">
                  <label><span className="training-info__label">Описание тренировки</span>
                    <textarea name="description" disabled={!isEdit}>{description}</textarea>
                  </label>
                </div>
              </div>
              <div className="training-info__rating-wrapper">
                <div className="training-info__input training-info__input--rating">
                  <label><span className="training-info__label">Рейтинг</span><span className="training-info__rating-icon">
                      <svg width="18" height="18" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg></span>
                    <input type="number" name="rating" value={rating} disabled={!isEdit} />
                  </label>
                </div>
                <ul className="training-info__list">

                  <li className="training-info__item">
                    <div className="hashtag hashtag--white"><span>#{trainType}</span></div>
                  </li>
                  <li className="training-info__item">
                    <div className="hashtag hashtag--white"><span>#{gender}</span></div>
                  </li>
                  <li className="training-info__item">
                    <div className="hashtag hashtag--white"><span>#{calories}ккал</span></div>
                  </li>
                  <li className="training-info__item">
                    <div className="hashtag hashtag--white"><span>#{duration}</span></div>
                  </li>
                </ul>
              </div>
              <div className="training-info__price-wrapper">
                <div className="training-info__input training-info__input--price">
                  <label><span className="training-info__label">Стоимость</span>
                    <input type="text" name="price" value={`${price} ₽`} disabled={!isEdit} />
                  </label>
                  <div className="training-info__error">Введите число</div>
                </div>
                {isEdit && <button className="btn-flat btn-flat--light btn-flat--underlined training-info__discount" type="button">
                  <svg width="14" height="14" aria-hidden="true">
                    <use xlinkHref="#icon-discount"></use>
                  </svg><span>Сделать скидку 10%</span>
                </button>}
                {!isEdit && <button className="btn training-info__buy" type="button">Купить</button>}
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="training-video">
        <h2 className="training-video__title">Видео</h2>
        {videoURL && <div className="training-video__video">
          <div className="training-video__thumbnail">
            <picture>
              <source type="image/webp" srcSet="markup/img/content/training-video/video-thumbnail.webp, markup/img/content/training-video/video-thumbnail@2x.webp 2x" /><img src="markup/img/content/training-video/video-thumbnail.png" srcSet="markup/img/content/training-video/video-thumbnail@2x.png 2x" width="922" height="566" alt="Обложка видео" />
            </picture>
          </div>
          <button className="training-video__play-button btn-reset">
            <svg width="18" height="30" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
        </div>}
        {!videoURL && <div className="training-video__drop-files">
          <form action="#" method="post">
            <div className="training-video__form-wrapper">
              <div className="drag-and-drop">
                <label><span className="drag-and-drop__label" tabIndex={0}>Загрузите сюда файлы формата MOV, AVI или MP4
                    <svg width="20" height="20" aria-hidden="true">
                      <use xlinkHref="#icon-import-video"></use>
                    </svg></span>
                  <input type="file" name="import" tabIndex={-1} accept=".mov, .avi, .mp4" />
                </label>
              </div>
            </div>
          </form>
        </div>}
        <div className="training-video__buttons-wrapper">
          {!isEdit &&  <button className="btn training-video__button training-video__button--start" type="button">Приступить</button>}
          {isEdit && <div className="training-video__edit-buttons">
            <button className="btn" type="button">Сохранить</button>
            <button className="btn btn--outlined" type="button">Удалить</button>
          </div>}
        </div>
      </div>
    </div>
  )
}
