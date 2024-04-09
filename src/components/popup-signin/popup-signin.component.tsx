import { FormEvent, useRef, useState } from 'react';
import { isPasswordValid, isEmailValid } from '../../helpers';
import { NULL_LENGTH, errorStyle } from '../../const';
import { useAppDispatch } from '../../hooks/hooks';
import { loginUserAction } from '../../store/user/user.actions';

export default function PopupSigninComponent(): JSX.Element {
  const dispatch = useAppDispatch();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [submit, setSubmit] = useState<boolean>(false);
  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setSubmit(true);
    if (isEmailValid(email) && isPasswordValid(password)) {
      dispatch(loginUserAction({ email, password}));
    }
  };
  return (
    <div className="popup-form popup-form--sign-in">
      <div className="popup-form__wrapper">
        <div className="popup-form__content">
          <div className="popup-form__title-wrapper">
            <h1 className="popup-form__title">Вход</h1>
          </div>
          <div className="popup-form__form">
            <form
              method="get"
              onSubmit={(evt) => handleFormSubmit(evt)}
            >
              <div className="sign-in">
                <div className="custom-input sign-in__input">
                  <label><span className="custom-input__label">E-mail</span><span className="custom-input__wrapper">
                      <input
                        type="email"
                        name="email"
                        ref={emailRef}
                        onChange={() => setEmail(emailRef.current?.value ?? '')}
                      /></span>
                      {email.length === NULL_LENGTH && submit && <p style={errorStyle}>Заполните поле</p>}
                      {!isEmailValid(email) && submit && <p style={errorStyle}>Должен быть указан валидный e-mail</p>}
                  </label>
                </div>
                <div className="custom-input sign-in__input">
                  <label><span className="custom-input__label">Пароль</span><span className="custom-input__wrapper">
                      <input
                        type="password"
                        name="password"
                        ref={passwordRef}
                        onChange={() => setPassword(passwordRef.current?.value ?? '')}
                      /></span>
                      {password.length === NULL_LENGTH && submit && <p style={errorStyle}>Заполните поле</p>}
                      {!isPasswordValid(password) && submit && <p style={errorStyle}>Длина пароля должна составлять от 6 до 12 символов.</p>}
                  </label>
                </div>
                <button className="btn sign-in__button" type="submit">Продолжить</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
