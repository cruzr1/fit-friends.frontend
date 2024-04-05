import { useRef, ChangeEvent, useState, FormEvent } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { DEFAULT_PATH, Gender, Location, LocationCaption, UserRole, NULL_LENGTH, errorStyle, Level } from '../../const';
import { isBirthDateValid, isEmailValid, isNameValid, isPasswordValid, isAvatarValid } from '../../helpers';
import { signinUserAction } from '../../store/user/user.actions';
import { useNavigate } from 'react-router-dom';

export default function PopupSignupComponent(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const avatarRef = useRef<HTMLInputElement>(null);
  const [avatarURL, setAvatarURL] = useState<string>('');
  const nameRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState<string>('');
  const emailRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState<string>('');
  const birthDateRef = useRef<HTMLInputElement>(null);
  const [birthDate, setBirthDate] = useState<string>('');
  const passwordRef = useRef<HTMLInputElement>(null);
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<UserRole>(UserRole.User);
  const [gender, setGender] = useState<Gender>(Gender.Female);
  const [location, setLocation] = useState<Location>(Location.Petrogradskaya);
  const [locationOpen, setLocationOpen] = useState<boolean>(false);
  const [submit, setSubmit] = useState<boolean>(false);
  const isFormValid = isEmailValid(email)
    && isNameValid(name)
    && isPasswordValid(password)
    && isBirthDateValid(birthDate)
    && isAvatarValid(avatarURL);
  const handleAvatarChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const newAvatar = evt.target.files && evt.target.files[0];
    if (!newAvatar) {
      return;
    }
    setAvatarURL(`${DEFAULT_PATH}/${newAvatar.name}`);
  }
  const handleAvatarClick = (evt: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    evt.preventDefault();
    avatarRef.current?.click()
  }
  const handleLocationItemChange = (target: HTMLUListElement ) => {
    setLocation(target.id as Location);
    setLocationOpen(false)
  }
  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setSubmit(true);
    if (!isFormValid) {
      console.log('wrong');
      return;
    }
    const newUser ={
      name,
      email,
      avatar: avatarURL,
      password,
      gender,
      birthDate,
      role,
      description: 'some additional info about user...',
      location,
      backgroundImage: avatarURL,
    }
    dispatch(signinUserAction(newUser));
  }
  return (
    <div className="popup-form popup-form--sign-up">
      <div className="popup-form__wrapper">
        <div className="popup-form__content">
          <div className="popup-form__title-wrapper">
            <h1 className="popup-form__title">Регистрация</h1>
          </div>
          <div className="popup-form__form">
            <form method="get" onSubmit={(evt) => handleFormSubmit(evt)}>
              <div className="sign-up">
                <div className="sign-up__load-photo">
                  <div className="input-load-avatar">
                    <label>
                      <input
                        className="visually-hidden"
                        type="file"
                        accept="image/png, image/jpeg"
                        ref={avatarRef}
                        onChange={(evt) => handleAvatarChange(evt)}
                      /><span
                          className="input-load-avatar__btn"
                          onClick={(evt) => handleAvatarClick(evt)}
                        >
                        <svg width="20" height="20" aria-hidden="true">
                          <use xlinkHref="#icon-import"></use>
                        </svg></span>
                    </label>
                  </div>
                  <div className="sign-up__description">
                    <h2 className="sign-up__legend">Загрузите фото профиля</h2><span className="sign-up__text">JPG, PNG, оптимальный размер 100&times;100&nbsp;px</span>
                  </div>
                </div>
                <div className="sign-up__data">
                  <div className="custom-input">
                    <label><span className="custom-input__label">Имя</span><span className="custom-input__wrapper">
                        <input
                          type="text"
                          name="name"
                          ref={nameRef}
                          onChange={(evt) => setName(evt.target.value)}
                        /></span>
                        {name.length === NULL_LENGTH && submit && <p style={errorStyle}>Заполните поле</p>}
                    </label>
                  </div>
                  <div className="custom-input">
                    <label><span className="custom-input__label">E-mail</span><span className="custom-input__wrapper">
                        <input
                          type="email"
                          name="email"
                          ref={emailRef}
                          onChange={(evt) => setEmail(evt.target.value)}
                        /></span>
                        {email.length === NULL_LENGTH && submit && <p style={errorStyle}>Заполните поле</p>}
                    </label>
                  </div>
                  <div className="custom-input">
                    <label><span className="custom-input__label">Дата рождения</span><span className="custom-input__wrapper">
                        <input
                          type="date"
                          name="birthday"
                          max="2009-12-31"
                          ref={birthDateRef}
                          onChange={(evt) => setBirthDate(evt.target.value)}
                        /></span>
                        {birthDate.length === NULL_LENGTH && submit && <p style={errorStyle}>Заполните поле</p>}
                    </label>
                  </div>
                  <div className={`custom-select ${locationOpen ? 'is-open' : ''}`}><span className="custom-select__label">Ваша локация</span>
                  <button
                    className="custom-select__button"
                    type="button"
                    aria-label="Выберите одну из опций"
                    onClick={() => setLocationOpen(!locationOpen)}
                  >{LocationCaption[location]}<span className="custom-select__icon">
                            <svg width="15" height="6" aria-hidden="true">
                              <use xlinkHref="#arrow-down"></use>
                            </svg></span></button>
                            <ul className="custom-select__list" role="listbox" onClick={(evt) => handleLocationItemChange(evt.target as HTMLUListElement)}>
                              <li className="custom-select__item" id='Petrogradskaya' role='option'>Петроградская</li>
                              <li className="custom-select__item" id='Pionerskaya' role='option'>Пионерская</li>
                              <li className="custom-select__item" id='Udelnaya' role='option'>Удельная</li>
                              <li className="custom-select__item" id='Zvezdnaya' role='option'>Звездная</li>
                              <li className="custom-select__item" id='Sportivnaya' role='option'>Спортивная</li>
                        </ul>
                  </div>
                  <div className="custom-input">
                    <label><span className="custom-input__label">Пароль</span><span className="custom-input__wrapper">
                        <input
                          type="password"
                          name="password"
                          autoComplete="off"
                          ref={passwordRef}
                          onChange={(evt) => setPassword(evt.target.value)}
                        /></span>
                        {password.length === NULL_LENGTH && submit && <p style={errorStyle}>Заполните поле</p>}
                    </label>
                  </div>
                  <div className="sign-up__radio"><span className="sign-up__label">Пол</span>
                    <div className="custom-toggle-radio custom-toggle-radio--big">
                      <div className="custom-toggle-radio__block">
                        <label>
                          <input
                            type="radio"
                            name="sex"
                            checked={gender === Gender.Male}
                            value={Gender.Male}
                            onChange={(evt) => setGender(evt.target.value as Gender)}
                          /><span className="custom-toggle-radio__icon"></span><span className="custom-toggle-radio__label">Мужской</span>
                        </label>
                      </div>
                      <div className="custom-toggle-radio__block">
                        <label>
                        <input
                            type="radio"
                            name="sex"
                            value={Gender.Female}
                            checked={gender === Gender.Female}
                            onChange={(evt) => setGender(evt.target.value as Gender)}
                          /><span className="custom-toggle-radio__icon"></span><span className="custom-toggle-radio__label">Женский</span>
                        </label>
                      </div>
                      <div className="custom-toggle-radio__block">
                        <label>
                        <input
                            type="radio"
                            name="sex"
                            checked={gender === Gender.Any}
                            value={Gender.Any}
                            onChange={(evt) => setGender(evt.target.value as Gender)}
                          /><span className="custom-toggle-radio__icon"></span><span className="custom-toggle-radio__label">Неважно</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sign-up__role">
                  <h2 className="sign-up__legend">Выберите роль</h2>
                  <div className="role-selector sign-up__role-selector">
                    <div className="role-btn">
                      <label>
                        <input
                          className="visually-hidden"
                          type="radio"
                          name="role"
                          value="Trainer"
                          checked={role === UserRole.Trainer}
                          onChange={(evt) => setRole(evt.target.value as UserRole)}
                        /><span className="role-btn__icon">
                          <svg width="12" height="13" aria-hidden="true">
                            <use xlinkHref="#icon-cup"></use>
                          </svg></span><span className="role-btn__btn">Я хочу тренировать</span>
                      </label>
                    </div>
                    <div className="role-btn">
                      <label>
                        <input
                          className="visually-hidden"
                          type="radio"
                          name="role"
                          value="User"
                          checked={role === UserRole.User}
                          onChange={(evt) => setRole(evt.target.value as UserRole)}
                        /><span className="role-btn__icon">
                          <svg width="12" height="13" aria-hidden="true">
                            <use xlinkHref="#icon-weight"></use>
                          </svg></span><span className="role-btn__btn">Я хочу тренироваться</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="sign-up__checkbox">
                  <label>
                    <input type="checkbox" value="user-agreement" name="user-agreement" /><span className="sign-up__checkbox-icon">
                      <svg width="9" height="6" aria-hidden="true">
                        <use xlinkHref="#arrow-check"></use>
                      </svg></span><span className="sign-up__checkbox-label">Я соглашаюсь с <span>политикой конфиденциальности</span> компании</span>
                  </label>
                </div>
                <button className="btn sign-up__button" type="submit">Продолжить</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
