import { useState, useRef, useEffect } from 'react';
import { TrainingType, UserType } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { updateTrainingAction } from '../../store/training/training.actions';
import { adaptImage } from '../../helpers';
import { selectTrainingsCount } from '../../store/user/user.selectors';
import { loadAvailableTrainingsCountAction, useActiveTrainingsAction } from '../../store/user/user.actions';

type TrainingCardComponentProps = {
  training: TrainingType;
  trainer: UserType;
  isTrainer: boolean;
  handleBuyButtonClick: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function TrainingCardComponent({training, trainer, isTrainer, handleBuyButtonClick}: TrainingCardComponentProps): JSX.Element {
  const dispatch = useAppDispatch();
  const trainingsCount = useAppSelector(selectTrainingsCount);
  useEffect(() => {
    let isMounted = true;
    if (isMounted && !isTrainer) {
      dispatch(loadAvailableTrainingsCountAction(training.id));
    }
    return () => {
      isMounted = false;
    }
  }, [dispatch, trainingsCount ]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [name, setName] = useState<string>(training.name);
  const [description, setDescription] = useState<string>(training.description);
  const [price, setPrice] = useState<number>(training.price);
  const [isSpecial, setIsSpecial] = useState<boolean>(training.isSpecial);
  const [video, setVideo] = useState<File | undefined>(undefined);
  const [videoURL, setVideoURL] = useState<string | undefined>(training.videoURL);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [isTrainingActive, setIsTrainingActive] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleSaveButtonClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    setIsEdit(false);
  };
  const handleDiscountClick = () => {
    if (isSpecial) {
      setPrice(Math.round(price / 0.9));
      setIsSpecial(false);
    } else {
      setPrice(Math.round(price * 0.9));
      setIsSpecial(true);
    }
  };
  const handleVideoDrop = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) {
      return;
    }
    setVideo(evt.target.files[0]);
    setVideoURL(evt.target.files[0].name);
  };
  const handleDeleteVideoButtonClick = () => {
    setVideo(undefined);
    setVideoURL(undefined);
    if (inputRef.current) {
      inputRef.current.value ='';
    }
  };
  const handleSaveVideoButtonClick = () => {
    dispatch(updateTrainingAction({
      id: training.id,
      videoURL
    }))
    setIsVideoPlaying(false);
  };
  const handlePlayButtonClick = () => {
    setIsVideoPlaying(!isVideoPlaying);
    if (videoRef.current === null) {
      return;
    }
    if (isVideoPlaying) {
      videoRef.current.play();
      return;
    }
    videoRef.current.pause();
  };
  const handleUseButtonClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    if (isTrainingActive) {
      dispatch(useActiveTrainingsAction(training.id));
    }
    setIsTrainingActive(!isTrainingActive);
    setIsVideoPlaying(false);
  }
  return (
    <div className={`training-card ${isEdit ? 'training-card--edit': ''}`}>
      <div className="training-info">
        <h2 className="visually-hidden">Информация о тренировке</h2>
        <div className="training-info__header">
          <div className="training-info__coach">
            <div className="training-info__photo">
              <picture>
                <source type="image/webp" srcSet={`/img/content/avatars/coaches/${adaptImage(trainer.avatar)}.webp, /img/content/avatars/coaches/${adaptImage(trainer.avatar)}@2x.webp 2x`} /><img src={`/img/content/avatars/coaches/${adaptImage(trainer.avatar)}.png srcSet="/img/content/avatars/coaches/${adaptImage(trainer.avatar)}@2x.png 2x`} width="64" height="64" alt="Изображение тренера" />
              </picture>
            </div>
            <div className="training-info__coach-info"><span className="training-info__label">Тренер</span><span className="training-info__name">{trainer.name}</span></div>
          </div>
          {isTrainer && !isEdit &&
            <button
              className="btn-flat btn-flat--light training-info__edit training-info__edit--edit"
              type="button"
              onClick={() => setIsEdit(true)}
            >
              <svg width="12" height="12" aria-hidden="true">
                <use xlinkHref="#icon-edit"></use>
              </svg><span>Редактировать</span>
            </button>
          }
          {isTrainer && isEdit &&
            <button
              className="btn-flat btn-flat--light btn-flat--underlined training-info__edit training-info__edit--save"
              type="button"
              onClick={(evt) => handleSaveButtonClick(evt)}
            >
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
                    <input
                      type="text"
                      name="training"
                      value={name}
                      disabled={!isEdit}
                      onChange={(evt) => setName(evt.target.value)}
                    />
                  </label>
                  <div className="training-info__error">Обязательное поле</div>
                </div>
                <div className="training-info__textarea">
                  <label><span className="training-info__label">Описание тренировки</span>
                    <textarea
                      name="description"
                      value={description}
                      disabled={!isEdit}
                      onChange={(evt) => setDescription(evt.target.value)}
                      ></textarea>
                  </label>
                </div>
              </div>
              <div className="training-info__rating-wrapper">
                <div className="training-info__input training-info__input--rating">
                  <label><span className="training-info__label">Рейтинг</span><span className="training-info__rating-icon">
                      <svg width="18" height="18" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg></span>
                    <input type="number" name="rating" value={training.rating} disabled={!isEdit} />
                  </label>
                </div>
                <ul className="training-info__list">
                  <li className="training-info__item">
                    <div className="hashtag hashtag--white"><span>#{training.trainType}</span></div>
                  </li>
                  <li className="training-info__item">
                    <div className="hashtag hashtag--white"><span>#{training.gender}</span></div>
                  </li>
                  <li className="training-info__item">
                    <div className="hashtag hashtag--white"><span>#{training.calories}ккал</span></div>
                  </li>
                  <li className="training-info__item">
                    <div className="hashtag hashtag--white"><span>#{training.duration}</span></div>
                  </li>
                </ul>
              </div>
              <div className="training-info__price-wrapper">
                <div className="training-info__input training-info__input--price">
                  <label><span className="training-info__label">Стоимость</span>
                    <input
                      type="text"
                      name="price"
                      value={`${price} ₽`}
                      disabled={!isEdit}
                    />
                  </label>
                  <div className="training-info__error">Введите число</div>
                </div>
                {isTrainer && isEdit &&
                    <button
                      className="btn-flat btn-flat--light btn-flat--underlined training-info__discount"
                      type="button"
                      onClick={() => handleDiscountClick()}
                    >
                    <svg width="14" height="14" aria-hidden="true">
                      <use xlinkHref="#icon-discount"></use>
                    </svg><span>{!isSpecial ? 'Сделать скидку 10%' : 'Отменить скидку'}</span>
                  </button>}
                {!isTrainer && <button
                  className="btn training-info__buy"
                  type="button"
                  onClick={(evt) => handleBuyButtonClick(evt)}
                  disabled={trainingsCount > 0}
                >Купить</button>}
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="training-video">
        <h2 className="training-video__title">Видео</h2>
        <div className="training-video__video">
          <div className="training-video__thumbnail">
            {videoURL &&
              <video
                src={`/img/content/training-video/${videoURL}`}
                poster="/img/content/training-video/video-thumbnail.png"
                width="922"
                height="566"
                ref={videoRef}
                controls={isVideoPlaying}
              />
            }
            {!isVideoPlaying &&
              !isTrainer &&
              isTrainingActive &&
              trainingsCount > 0 &&
              <button
                className="training-video__play-button btn-reset"
                onClick={() => handlePlayButtonClick()}
              >
              <svg width="18" height="30" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
            }
            {!isVideoPlaying && isTrainer &&
              <button
                className="training-video__play-button btn-reset"
                onClick={() => handlePlayButtonClick()}
              >
              <svg width="18" height="30" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
            }
          </div>

        </div>
        {!video && !videoURL && isTrainer && <div className="training-video__drop-files" style={{ display: 'flex'}}>
          <form action="#" method="post">
            <div className="training-video__form-wrapper">
              <div className="drag-and-drop">
                <label>
                  <span className="drag-and-drop__label" tabIndex={0}>
                    'Загрузите сюда файлы формата MOV, AVI или MP4'
                    <svg width="20" height="20" aria-hidden="true">
                      <use xlinkHref="#icon-import-video"></use>
                    </svg>
                  </span>
                  <input
                    type="file"
                    name="import"
                    ref={inputRef}
                    required
                    tabIndex={-1}
                    accept=".mov, .avi, .mp4"
                    onChange={(evt) => handleVideoDrop(evt)}
                    disabled={!isEdit}
                  />
                </label>
              </div>
            </div>
          </form>
        </div>}
        <div className="training-video__buttons-wrapper">
          {!isTrainer && <button
            className="btn training-video__button training-video__button--start"
            disabled={trainingsCount === 0 && !isTrainingActive}
            type="button"
            onClick={(evt) => handleUseButtonClick(evt)}
          >{isTrainingActive ? 'Закончить' : 'Приступить'}</button>}
          {isTrainer && isEdit && <div className="training-video__edit-buttons">
            <button
              className="btn"
              type="button"
              onClick={() => handleSaveVideoButtonClick()}
            >Сохранить</button>
            <button
              className="btn btn--outlined"
              type="button"
              onClick={() => handleDeleteVideoButtonClick()}
            >Удалить</button>
          </div>}
        </div>
      </div>
    </div>
  )
}
