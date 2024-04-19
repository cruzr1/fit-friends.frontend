import { Link, NavLink } from 'react-router-dom';
import { AppRoute, CATALOG_COUNT, NULL_VALUE } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectNotifications } from '../../store/user/user.selectors';
import { loadNotificationsAction } from '../../store/user/user.actions';
import { useState } from 'react';
import { adaptDate } from '../../helpers';

export default function HeaderComponent (): JSX.Element {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(selectNotifications).slice(NULL_VALUE, CATALOG_COUNT);
  const handleNotificationsButtonClick = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    evt.preventDefault();
    dispatch(loadNotificationsAction())
  }
  const [isActiveList, setIsActivelist] = useState<boolean[]>(Array(CATALOG_COUNT).fill(true))
  const handleReadLinkClick = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>, readIndex: number) => {
    evt.preventDefault();
    const newActiveList = isActiveList.map((isActive, index) => index === readIndex ? false: isActive);
    setIsActivelist(newActiveList);
  }
  return (
    <header className="header">
      <div className="container"><Link className="header__logo" to={AppRoute.Index} aria-label="Переход на главную">
          <svg width="187" height="70" aria-hidden="true">
            <use xlinkHref="#logo"></use>
          </svg></Link>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item"><NavLink className={({isActive}) => ['main-nav__link', isActive ? 'is-active' : ''].join(' ')} to={AppRoute.Main} aria-label="На главную">
                <svg width="18" height="18" aria-hidden="true">
                  <use xlinkHref="#icon-home"></use>
                </svg></NavLink></li>
            <li className="main-nav__item"><NavLink className={({isActive}) => ['main-nav__link', isActive ? 'is-active' : ''].join(' ')} to={AppRoute.PersonalAccount} aria-label="Личный кабинет">
                <svg width="16" height="18" aria-hidden="true">
                  <use xlinkHref="#icon-user"></use>
                </svg></NavLink></li>
            <li className="main-nav__item"><NavLink className={({isActive}) => ['main-nav__link', isActive ? 'is-active' : ''].join(' ')} to={AppRoute.MyFriends} aria-label="Друзья">
                <svg width="22" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-friends"></use>
                </svg></NavLink></li>
            <li className="main-nav__item main-nav__item--notifications"><a
              className="main-nav__link"
              href="#"
              aria-label="Уведомления"
              onClick={(evt) => handleNotificationsButtonClick(evt)}
             >
                <svg width="14" height="18" aria-hidden="true">
                  <use xlinkHref="#icon-notification"></use>
                </svg></a>
              <div className="main-nav__dropdown">
                <p className="main-nav__label">Оповещения</p>
                <ul className="main-nav__sublist">
                  {notifications.map(({name, description, createdAt}, index) =>
                    <li key={createdAt} className="main-nav__subitem">
                      <a
                        className={`notification ${isActiveList[index] ? 'is-active' : ''}`}
                        href="#"

                        onClick={(evt) => handleReadLinkClick(evt, index)}
                      >
                        <p className="notification__text">{`${description}: ${name}`}</p>
                        <time className="notification__time" dateTime={"2023-12-23 12:35"}>{adaptDate(createdAt)}</time>
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </li>
          </ul>
        </nav>
        <div className="search">
          <form action="#" method="get">
            <label><span className="search__label">Поиск</span>
              <input type="search" name="search" />
              <svg className="search__icon" width="20" height="20" aria-hidden="true">
                <use xlinkHref="#icon-search"></use>
              </svg>
            </label>
            <ul className="search__list">
              <li className="search__item"><a className="search__link" href="#">Бокс</a></li>
              <li className="search__item"><a className="search__link is-active" href="#">Бег</a></li>
              <li className="search__item"><a className="search__link" href="#">Аэробика</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
            </ul>
          </form>
        </div>
      </div>
    </header>
  )
}
