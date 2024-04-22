import { useState } from 'react';
import { NULL_VALUE, NUMBER_REGEX, QuestionDurationCaption, TrainType, TrainTypeCaption, Duration, LevelCaption, Level, Gender, TrainingFormGenderCaption, errorStyle, SAMPLE_TRAINING_IMAGE, AppRoute } from '../../const';
import { isCaloriesValueValid, isDescriptionValid, isNameValid } from '../../helpers';
import { useAppDispatch } from '../../hooks/hooks';
import { useNavigate } from 'react-router-dom';
import { postTrainingAction } from '../../store/training/training.actions';
import { Helmet } from 'react-helmet-async';


export default function CreateTrainingPage (): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [trainingName, setTrainingName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [gender, setGender] = useState<Gender>(Gender.Female);
  const [isTrainTypeOpen, setTrainTypeOpen] = useState<boolean>(false);
  const [trainType, setTrainType] = useState<TrainType>();
  const [isDurationOpen, setDurationOpen] = useState<boolean>(false);
  const [duration, setDuration] = useState<Duration>();
  const [isLevelOpen, setLevelOpen] = useState<boolean>(false);
  const [level, setLevel] = useState<Level>();
  const [price, setPrice] = useState<number>(NULL_VALUE);
  const [calories, setCalories] = useState<number>(NULL_VALUE);
  const [videoURL, setVideoURL] = useState<string>('');
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const isFormValid = isNameValid(trainingName) &&
    trainType &&
    isCaloriesValueValid(calories) &&
    duration &&
    price > 0 &&
    level &&
    gender &&
    isDescriptionValid(description) &&
    videoURL;
  const handleTrainTypeItemChange = (target: HTMLUListElement) => {
    setTrainType(target.id as TrainType);
    setTrainTypeOpen(false);
  };
  const handleDurationChange = (target: HTMLUListElement) => {
    setDuration(target.id as Duration);
    setDurationOpen(false);
  };
  const handleLevelChange = (target: HTMLUListElement) => {
    setLevel(target.id as Level);
    setLevelOpen(false);
  };
  const handleVideoChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    const newVideo = evt.target.files && evt.target.files[0];
    if (!newVideo) {
      return;
    }
    setVideoURL(newVideo.name);
  };
  const handleFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsSubmit(true);
    if (isFormValid) {
      dispatch(postTrainingAction({
        name: trainingName,
        backgroundImage: SAMPLE_TRAINING_IMAGE,
        level,
        trainType,
        duration,
        price,
        calories,
        description,
        gender,
        videoURL,
        isSpecial: false,
      }));
      navigate(AppRoute.PersonalAccount);
    }
  };
  return (
    <div className="popup-form popup-form--create-training">
      <Helmet>
        <title>Создание тренировки — Fit friends</title>
      </Helmet>
      <div className="popup-form__wrapper">
        <div className="popup-form__content">
          <div className="popup-form__title-wrapper">
            <h1 className="popup-form__title">Создание тренировки</h1>
          </div>
          <div className="popup-form__form">
            <form method="get" onSubmit={(evt) => handleFormSubmit(evt)}>
              <div className="create-training">
                <div className="create-training__wrapper">
                  <div className="create-training__block">
                    <h2 className="create-training__legend">Название тренировки</h2>
                    {isSubmit && !isNameValid(trainingName) && <span style={errorStyle}>Длина от 1 до 15 символов</span>}
                    <div className="custom-input create-training__input">
                      <label>
                        <span className="custom-input__wrapper">
                          <input
                            type="text"
                            name="training-name"
                            value={trainingName}
                            onChange={(evt) => setTrainingName(evt.target.value)}
                          />
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="create-training__block">
                    <h2 className="create-training__legend">Характеристики тренировки</h2>
                    <div className="create-training__info">
                      <div className={`custom-select ${isTrainTypeOpen ?
                        'is-open' :
                        'custom-select--not-selected'}`}
                      ><span className="custom-select__label">Выберите тип тренировки</span>
                        {isSubmit && !trainType && <span style={errorStyle}>Необходимо выбрать тип тренировки</span>}
                        <div className="custom-select__placeholder">{trainType ? TrainTypeCaption[trainType] : ''}</div>
                        <button
                          className="custom-select__button"
                          type="button"
                          aria-label="Выберите одну из опций"
                          onClick={() => setTrainTypeOpen(!isTrainTypeOpen)}
                        ><span className="custom-select__text"></span>
                          <span className="custom-select__icon">
                            <svg width="15" height="6" aria-hidden="true">
                              <use xlinkHref="#arrow-down"></use>
                            </svg>
                          </span>
                        </button>
                        <ul
                          className="custom-select__list"
                          role="listbox"
                          onClick={(evt) => handleTrainTypeItemChange(evt.target as HTMLUListElement)}
                        >
                          {Object.values(TrainType).map((type) =>
                            <li key={type} className="custom-select__item" id={type} aria-selected={type === trainType} role='option'>{TrainTypeCaption[type]}</li>
                          )}
                        </ul>
                      </div>
                      <div className="custom-input custom-input--with-text-right">
                        <label><span className="custom-input__label">Сколько калорий потратим</span>
                          {isSubmit && !isCaloriesValueValid(calories) && <span style={errorStyle}>Значение от 1000 до 5000</span>}
                          <span className="custom-input__wrapper">
                            <input
                              type="text"
                              name="calories"
                              value={calories}
                              onChange={(evt) => setCalories(+evt.target.value.replace(NUMBER_REGEX, ''))}
                            /><span className="custom-input__text">ккал</span>
                          </span>
                        </label>
                      </div>
                      <div className={`custom-select ${isDurationOpen ?
                        'is-open' :
                        'custom-select--not-selected'}`}
                      ><span className="custom-select__label">Сколько времени потратим</span>
                        {isSubmit && !duration && <span style={errorStyle}>Необходимо выбрать значение</span>}
                        <div className="custom-select__placeholder">{duration ? QuestionDurationCaption[duration] : ''}</div>
                        <button
                          className="custom-select__button"
                          type="button"
                          aria-label="Выберите одну из опций"
                          onClick={() => setDurationOpen(!isDurationOpen)}
                        ><span className="custom-select__text"></span>
                          <span className="custom-select__icon">
                            <svg width="15" height="6" aria-hidden="true">
                              <use xlinkHref="#arrow-down"></use>
                            </svg>
                          </span>
                        </button>
                        <ul
                          className="custom-select__list"
                          role="listbox"
                          onClick={(evt) => handleDurationChange(evt.target as HTMLUListElement)}
                        >
                          {Object.values(Duration).map((durationItem) =>
                            <li key={durationItem} className="custom-select__item" id={durationItem} aria-selected={durationItem === duration} role='option'>{QuestionDurationCaption[durationItem]}</li>
                          )}
                        </ul>
                      </div>
                      <div className="custom-input custom-input--with-text-right">
                        <label><span className="custom-input__label">Стоимость тренировки</span>
                          {isSubmit && price <= NULL_VALUE && <span style={errorStyle}>Значение больше 0</span>}
                          <span className="custom-input__wrapper">
                            <input
                              type="text"
                              name="price"
                              value={price}
                              onChange={(evt) => setPrice(+evt.target.value.replace(NUMBER_REGEX, ''))}
                            /><span className="custom-input__text">₽</span>
                          </span>
                        </label>
                      </div>
                      <div className={`custom-select ${isLevelOpen ?
                        'is-open' :
                        'custom-select--not-selected'}`}
                      ><span className="custom-select__label">Выберите уровень тренировки</span>
                        {isSubmit && !level && <span style={errorStyle}>Необходимо выбрать значение</span>}
                        <div className="custom-select__placeholder">{level ? LevelCaption[level] : ''}</div>
                        <button
                          className="custom-select__button"
                          type="button"
                          aria-label="Выберите одну из опций"
                          onClick={() => setLevelOpen(!isLevelOpen)}
                        ><span className="custom-select__text"></span>
                          <span className="custom-select__icon">
                            <svg width="15" height="6" aria-hidden="true">
                              <use xlinkHref="#arrow-down"></use>
                            </svg>
                          </span>
                        </button>
                        <ul
                          className="custom-select__list"
                          role="listbox"
                          onClick={(evt) => handleLevelChange(evt.target as HTMLUListElement)}
                        >
                          {Object.values(Level).map((levelItem) =>
                            <li key={levelItem} className="custom-select__item" id={levelItem} aria-selected={levelItem === level} role='option'>{LevelCaption[levelItem]}</li>
                          )}
                        </ul>
                      </div>
                      <div className="create-training__radio-wrapper"><span className="create-training__label">Кому подойдет тренировка</span>
                        {isSubmit && !gender && <span style={errorStyle}>Необходимо выбрать значение</span>}
                        <br />
                        <div className="custom-toggle-radio create-training__radio">
                          {Object.values(Gender).map((genderItem) =>
                            (
                              <div key={genderItem} className="custom-toggle-radio__block">
                                <label>
                                  <input
                                    type="radio"
                                    name="gender"
                                    value={genderItem}
                                    checked={gender === genderItem}
                                    onChange={(evt) => setGender(evt.target.value as Gender)}
                                  /><span className="custom-toggle-radio__icon"></span><span className="custom-toggle-radio__label">{TrainingFormGenderCaption[genderItem]}</span>
                                </label>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="create-training__block">
                    <h2 className="create-training__legend">Описание тренировки</h2>
                    {isSubmit && !isDescriptionValid(description) && <span style={errorStyle}>Длина от 10 до 140 символов</span>}
                    <div className="custom-textarea create-training__textarea">
                      <label>
                        <textarea
                          name="description"
                          placeholder=" "
                          value={description}
                          onChange={(evt) => setDescription(evt.target.value)}
                        >
                        </textarea>
                      </label>
                    </div>
                  </div>
                  <div className="create-training__block">
                    <h2 className="create-training__legend">Загрузите видео-тренировку</h2>
                    {isSubmit && !videoURL && <span style={errorStyle}>Загрузите файл</span>}
                    <div className="drag-and-drop create-training__drag-and-drop">
                      <label>
                        <span className="drag-and-drop__label" tabIndex={0} >{videoURL || 'Загрузите сюда файлы формата MOV, AVI или MP4'}
                          <svg width="20" height="20" aria-hidden="true">
                            <use xlinkHref="#icon-import-video"></use>
                          </svg>
                        </span>
                        <input
                          type="file"
                          name="import"
                          tabIndex={-1}
                          accept=".mov, .avi, .mp4"
                          onChange={(evt) => handleVideoChange(evt)}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <button
                  className="btn create-training__button"
                  type="submit"
                >Опубликовать
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
