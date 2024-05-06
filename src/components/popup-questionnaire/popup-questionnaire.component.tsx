import { ChangeEvent, useState, FormEvent } from 'react';
import { Duration, QuestionDurationCaption, Level, LevelCaption, TrainType, TrainTypeCaption, UserRole, errorStyle, AppRoute, NUMBER_REGEX } from '../../const';
import { isCaloriesValueValid, isDescriptionValid, isCertificateValid, isStatusFulfilled } from '../../helpers';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectUser, selectUserUpdateStatus } from '../../store/user/user.selectors';
import { updateUserAction } from '../../store/user/user.actions';
import { Navigate } from 'react-router-dom';

export default function PopupQuestionnaireComponent(): JSX.Element {
  const isCoach = useAppSelector(selectUser)?.role === UserRole.Trainer;
  const dispatch = useAppDispatch();
  const classApply = isCoach ? 'coach' : 'user';
  const [trainType, setTrainType] = useState<TrainType[]>([]);
  const [level, setLevel] = useState<Level>(Level.Newby);
  const [duration, setDuration] = useState<Duration>(Duration.From10to30min);
  const [caloriesTarget, setCaloriesTarget] = useState<number>(0);
  const [caloriesDaily, setCaloriesDaily] = useState<number>(0);
  const [achievements, setAchievements] = useState<string>('');
  const [isReadyTrain, setIsReadyTrain] = useState<boolean>(true);
  const [certificateURL, setCertificateURL] = useState<string>('');
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const userUpdateStatus = useAppSelector(selectUserUpdateStatus);
  const isFormValid = (
    isCaloriesValueValid(caloriesDaily)
    && isCaloriesValueValid(caloriesTarget)
    && !isCoach
  ) || (
    isCoach
    && isDescriptionValid(achievements)
    && isCertificateValid(certificateURL)
  );
  const handleTrainTypeChange = ({target: {value: checkedType}}: React.ChangeEvent<HTMLInputElement>) => {
    if (trainType.includes(checkedType as TrainType)) {
      setTrainType(trainType.filter((type) => type !== checkedType));
    } else {
      setTrainType(trainType.concat(checkedType as TrainType));
    }
  };
  const handleCertificateChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const newCertificate = evt.target.files && evt.target.files[0];
    if (!newCertificate) {
      return;
    }
    setCertificateURL(newCertificate.name);
  };
  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsSubmit(true);
    if (!isFormValid) {
      return;
    }
    const updateUser = {
      isCoach,
      trainType,
      level,
      duration,
      caloriesDaily: +caloriesDaily,
      caloriesTarget: +caloriesTarget,
      isReadyTrain,
      certificates: certificateURL,
      achievements,
    };
    dispatch(updateUserAction(updateUser));
  };
  if (isStatusFulfilled(userUpdateStatus)) {
    return <Navigate to={isCoach ? AppRoute.PersonalAccount : AppRoute.Main}></Navigate>;
  }
  return (
    <div className={`popup-form popup-form--questionnaire-${classApply}`} data-testid='popup'>
      <div className="popup-form__wrapper">
        <div className="popup-form__content">
          <div className="popup-form__form">
            <form method="get" onSubmit={(evt) => handleFormSubmit(evt)}>
              <div className={`questionnaire-${classApply}`} data-testid='quest'>
                <h1 className="visually-hidden">Опросник</h1>
                <div className={`questionnaire-${classApply}__wrapper`}>
                  <div className={`questionnaire-${classApply}__block`}><span className={`questionnaire-${classApply}__legend`}>Ваша специализация (тип) тренировок</span>
                    <div className={`specialization-checkbox questionnaire-${classApply}__specializations`}>
                      {Object.values(TrainType).map((type) =>
                        (
                          <div key={type} className="btn-checkbox">
                            <label>
                              <input
                                className="visually-hidden"
                                type="checkbox"
                                name="specialisation"
                                value={type}
                                checked={trainType.includes(type)}
                                onChange={(evt) => handleTrainTypeChange(evt)}
                              /><span className="btn-checkbox__btn">{TrainTypeCaption[type]}</span>
                            </label>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  {!isCoach &&
                    <div className="questionnaire-user__block"><span className="questionnaire-user__legend">Сколько времени вы готовы уделять на тренировку в день</span>
                      <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
                        {Object.values(Duration).map((interval) =>
                          (
                            <div key={interval} className="custom-toggle-radio__block">
                              <label>
                                <input
                                  type="radio"
                                  name="time"
                                  value={interval}
                                  checked={interval === duration}
                                  onChange={(evt) => setDuration(evt.target.value as Duration)}
                                /><span className="custom-toggle-radio__icon"></span><span className="custom-toggle-radio__label">{QuestionDurationCaption[interval]}</span>
                              </label>
                            </div>
                          )
                        )}
                      </div>
                    </div>}
                  <div className={`questionnaire-${classApply}__block`}><span className={`questionnaire-${classApply}__legend`}>Ваш уровень</span>
                    <div className={`custom-toggle-radio custom-toggle-radio--big questionnaire-${classApply}__radio`}>
                      { Object.values(Level).map((levelItem) =>
                        (
                          <div key={levelItem} className="custom-toggle-radio__block">
                            <label>
                              <input
                                value={levelItem}
                                type="radio"
                                name="level"
                                onChange={(evt) => setLevel(evt.target.value as Level)}
                              /><span className="custom-toggle-radio__icon"></span><span className="custom-toggle-radio__label">{LevelCaption[levelItem]}</span>
                            </label>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  {!isCoach &&
                    <>
                      <div className="questionnaire-user__calories-lose"><span className="questionnaire-user__legend">Сколько калорий хотите сбросить</span>{(caloriesTarget > 5000 || caloriesTarget < 1000) && isSubmit && <p style={errorStyle}>Значение 1000 до 5000</p>}
                        <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                          <label>
                            <span className="custom-input__wrapper">
                              <input
                                type="text"
                                name="calories-lose"
                                value={caloriesTarget}
                                onChange={(evt) => setCaloriesTarget(+(evt.target as HTMLInputElement).value.replace(NUMBER_REGEX, ''))}
                              /><span className="custom-input__text">ккал</span>
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className="questionnaire-user__calories-waste"><span className="questionnaire-user__legend">Сколько калорий тратить в день</span>{(caloriesDaily > 5000 || caloriesDaily < 1000) && isSubmit && <p style={errorStyle}>Значение 1000 до 5000</p>}
                        <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                          <label>
                            <span className="custom-input__wrapper">
                              <input
                                type="text"
                                name="calories-waste"
                                value={caloriesDaily}
                                onChange={(evt) => setCaloriesDaily(+(evt.target as HTMLInputElement).value.replace(NUMBER_REGEX, ''))}
                              /><span className="custom-input__text"> ккал</span>
                            </span>

                          </label>
                        </div>
                      </div>
                    </>}
                  {isCoach &&
                    <>
                      <div className={`questionnaire-${classApply}__block`}><span className={`questionnaire-${classApply}__legend`}>Ваши дипломы и сертификаты</span>
                        <div
                          className={`drag-and-drop questionnaire-${classApply}__drag-and-drop`}
                        >
                          <label>
                            <span
                              className="drag-and-drop__label"
                              tabIndex={0}
                            >{certificateURL || 'Загрузите сюда файлы формата PDF, JPG или PNG'}
                              <svg width="20" height="20" aria-hidden="true">
                                <use xlinkHref="#icon-import"></use>
                              </svg>
                            </span>
                            <input
                              type="file"
                              name="import"
                              tabIndex={-1}
                              accept=".pdf, .jpg, .png"
                              onChange={(evt) => handleCertificateChange(evt)}
                            />
                          </label>
                        </div>
                      </div>
                      <div className={`questionnaire-${classApply}__block`}><span className={`questionnaire-${classApply}__legend`}>Расскажите о своём опыте, который мы сможем проверить</span>
                        {(achievements.length < 10 || achievements.length > 140) && isSubmit && <p style={errorStyle}>от 10 до 140 символов</p>}
                        <div className={`custom-textarea questionnaire-${classApply}__textarea`}>
                          <label>
                            <textarea
                              name="description"
                              placeholder=" "
                              value={achievements}
                              onChange={(evt) => setAchievements(evt.target.value)}
                            >
                            </textarea>
                          </label>
                        </div>

                        <div className={`questionnaire-${classApply}__checkbox`}>
                          <label>
                            <input
                              type="checkbox"
                              value={'individual-training'}
                              checked={isReadyTrain}
                              onChange={() => setIsReadyTrain(!isReadyTrain)}
                              name="individual-training"
                            />
                            <span className={`questionnaire-${classApply}__checkbox-icon`}>
                              <svg width="9" height="6" aria-hidden="true">
                                <use xlinkHref="#arrow-check"></use>
                              </svg>
                            </span><span className={`questionnaire-${classApply}__checkbox-label`}>Хочу дополнительно индивидуально тренировать</span>
                          </label>
                        </div>
                      </div>
                    </>}
                </div>
                <button className={`btn questionnaire-${classApply}__button`} type="submit">Продолжить</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
