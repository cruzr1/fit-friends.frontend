export default function CreateTrainingPage (): JSX.Element {
  return (
    <div class="wrapper">
      <header class="header">
        <div class="container"><a class="header__logo" href="index.html" aria-label="Переход на главную">
            <svg width="187" height="70" aria-hidden="true">
              <use xlink:href="#logo"></use>
            </svg></a>
          <nav class="main-nav">
            <ul class="main-nav__list">
              <li class="main-nav__item"><a class="main-nav__link is-active" href="#" aria-label="На главную">
                  <svg width="18" height="18" aria-hidden="true">
                    <use xlink:href="#icon-home"></use>
                  </svg></a></li>
              <li class="main-nav__item"><a class="main-nav__link" href="#" aria-label="Личный кабинет">
                  <svg width="16" height="18" aria-hidden="true">
                    <use xlink:href="#icon-user"></use>
                  </svg></a></li>
              <li class="main-nav__item"><a class="main-nav__link" href="#" aria-label="Друзья">
                  <svg width="22" height="16" aria-hidden="true">
                    <use xlink:href="#icon-friends"></use>
                  </svg></a></li>
              <li class="main-nav__item main-nav__item--notifications"><a class="main-nav__link" href="#" aria-label="Уведомления">
                  <svg width="14" height="18" aria-hidden="true">
                    <use xlink:href="#icon-notification"></use>
                  </svg></a>
                <div class="main-nav__dropdown">
                  <p class="main-nav__label">Оповещения</p>
                  <ul class="main-nav__sublist">
                    <li class="main-nav__subitem"><a class="notification is-active" href="#">
                        <p class="notification__text">Катерина пригласила вас на&nbsp;тренировку</p>
                        <time class="notification__time" datetime="2023-12-23 12:35">23 декабря, 12:35</time></a>
                    </li>
                    <li class="main-nav__subitem"><a class="notification is-active" href="#">
                        <p class="notification__text">Никита отклонил приглашение на&nbsp;совместную тренировку</p>
                        <time class="notification__time" datetime="2023-12-22 09:22">22 декабря, 09:22</time></a>
                    </li>
                    <li class="main-nav__subitem"><a class="notification is-active" href="#">
                        <p class="notification__text">Татьяна добавила вас в&nbsp;друзья</p>
                        <time class="notification__time" datetime="2023-12-18 18:50">18 декабря, 18:50</time></a>
                    </li>
                    <!--<li class="main-nav__subitem"><a class="notification" href="#">
                        <p class="notification__text">Наталья приняла приглашение на&nbsp;совместную тренировку</p>
                        <time class="notification__time" datetime="2023-12-14 08:15">14 декабря, 08:15</time></a>
                    </li>-->
                  </ul>
                </div>
              </li>
            </ul>
          </nav>
          <div class="search">
            <form action="#" method="get">
              <label><span class="search__label">Поиск</span>
                <input type="search" name="search">
                <svg class="search__icon" width="20" height="20" aria-hidden="true">
                  <use xlink:href="#icon-search"></use>
                </svg>
              </label>
              <ul class="search__list">
                <li class="search__item"><a class="search__link" href="#">Бокс</a></li>
                <li class="search__item"><a class="search__link is-active" href="#">Бег</a></li>
                <li class="search__item"><a class="search__link" href="#">Аэробика</a></li>
                <li class="search__item"><a class="search__link" href="#">Text</a></li>
                <li class="search__item"><a class="search__link" href="#">Text</a></li>
                <li class="search__item"><a class="search__link" href="#">Text</a></li>
                <li class="search__item"><a class="search__link" href="#">Text</a></li>
                <li class="search__item"><a class="search__link" href="#">Text</a></li>
                <li class="search__item"><a class="search__link" href="#">Text</a></li>
                <li class="search__item"><a class="search__link" href="#">Text</a></li>
                <li class="search__item"><a class="search__link" href="#">Text</a></li>
                <li class="search__item"><a class="search__link" href="#">Text</a></li>
                <li class="search__item"><a class="search__link" href="#">Text</a></li>
              </ul>
            </form>
          </div>
        </div>
      </header>
      <main>
        <div class="popup-form popup-form--create-training">
          <div class="popup-form__wrapper">
            <div class="popup-form__content">
              <div class="popup-form__title-wrapper">
                <h1 class="popup-form__title">Создание тренировки</h1>
              </div>
              <div class="popup-form__form">
                <form method="get">
                  <div class="create-training">
                    <div class="create-training__wrapper">
                      <div class="create-training__block">
                        <h2 class="create-training__legend">Название тренировки</h2>
                        <div class="custom-input create-training__input">
                          <label><span class="custom-input__wrapper">
                              <input type="text" name="training-name"></span>
                          </label>
                        </div>
                      </div>
                      <div class="create-training__block">
                        <h2 class="create-training__legend">Характеристики тренировки</h2>
                        <div class="create-training__info">
                          <div class="custom-select custom-select--not-selected"><span class="custom-select__label">Выберите тип тренировки</span>
                            <button class="custom-select__button" type="button" aria-label="Выберите одну из опций"><span class="custom-select__text"></span><span class="custom-select__icon">
                                <svg width="15" height="6" aria-hidden="true">
                                  <use xlink:href="#arrow-down"></use>
                                </svg></span></button>
                            <ul class="custom-select__list" role="listbox">
                            </ul>
                          </div>
                          <div class="custom-input custom-input--with-text-right">
                            <label><span class="custom-input__label">Сколько калорий потратим</span><span class="custom-input__wrapper">
                                <input type="number" name="calories"><span class="custom-input__text">ккал</span></span>
                            </label>
                          </div>
                          <div class="custom-select custom-select--not-selected"><span class="custom-select__label">Сколько времени потратим</span>
                            <button class="custom-select__button" type="button" aria-label="Выберите одну из опций"><span class="custom-select__text"></span><span class="custom-select__icon">
                                <svg width="15" height="6" aria-hidden="true">
                                  <use xlink:href="#arrow-down"></use>
                                </svg></span></button>
                            <ul class="custom-select__list" role="listbox">
                            </ul>
                          </div>
                          <div class="custom-input custom-input--with-text-right">
                            <label><span class="custom-input__label">Стоимость тренировки</span><span class="custom-input__wrapper">
                                <input type="number" name="price"><span class="custom-input__text">₽</span></span>
                            </label>
                          </div>
                          <div class="custom-select custom-select--not-selected"><span class="custom-select__label">Выберите уровень тренировки</span>
                            <button class="custom-select__button" type="button" aria-label="Выберите одну из опций"><span class="custom-select__text"></span><span class="custom-select__icon">
                                <svg width="15" height="6" aria-hidden="true">
                                  <use xlink:href="#arrow-down"></use>
                                </svg></span></button>
                            <ul class="custom-select__list" role="listbox">
                            </ul>
                          </div>
                          <div class="create-training__radio-wrapper"><span class="create-training__label">Кому подойдет тренировка</span>
                            <br>
                            <div class="custom-toggle-radio create-training__radio">
                              <div class="custom-toggle-radio__block">
                                <label>
                                  <input type="radio" name="gender"><span class="custom-toggle-radio__icon"></span><span class="custom-toggle-radio__label">Мужчинам</span>
                                </label>
                              </div>
                              <div class="custom-toggle-radio__block">
                                <label>
                                  <input type="radio" name="gender" checked><span class="custom-toggle-radio__icon"></span><span class="custom-toggle-radio__label">Женщинам</span>
                                </label>
                              </div>
                              <div class="custom-toggle-radio__block">
                                <label>
                                  <input type="radio" name="gender"><span class="custom-toggle-radio__icon"></span><span class="custom-toggle-radio__label">Всем</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                      <div class="create-training__block">
                        <h2 class="create-training__legend">Описание тренировки</h2>
                        <div class="custom-textarea create-training__textarea">
                          <label>
                            <textarea name="description" placeholder=" "></textarea>
                          </label>
                        </div>
                      </div>
                      <div class="create-training__block">
                        <h2 class="create-training__legend">Загрузите видео-тренировку</h2>
                        <div class="drag-and-drop create-training__drag-and-drop">
                          <label><span class="drag-and-drop__label" tabindex="0">Загрузите сюда файлы формата MOV, AVI или MP4
                              <svg width="20" height="20" aria-hidden="true">
                                <use xlink:href="#icon-import-video"></use>
                              </svg></span>
                            <input type="file" name="import" tabindex="-1" accept=".mov, .avi, .mp4">
                          </label>
                        </div>
                      </div>
                    </div>
                    <button class="btn create-training__button" type="submit">Опубликовать</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
