import { CoachItemComponent, UserInfoComponent } from '../../components'

export default function PersonalAccountCoachPage(): JSX.Element {
  return (
    <section className="inner-page">
      <div className="container">
        <div className="inner-page__wrapper">
          <h1 className="visually-hidden">Личный кабинет</h1>
          <UserInfoComponent />
          <div className="inner-page__content">
            <div className="personal-account-coach">
              <div className="personal-account-coach__navigation"><a className="thumbnail-link thumbnail-link--theme-light" href="#">
                  <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                    <svg width="30" height="26" aria-hidden="true">
                      <use xlinkHref="#icon-flash"></use>
                    </svg>
                  </div><span className="thumbnail-link__text">Мои тренировки</span></a><a className="thumbnail-link thumbnail-link--theme-light" href="#">
                  <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                    <svg width="30" height="26" aria-hidden="true">
                      <use xlinkHref="#icon-add"></use>
                    </svg>
                  </div><span className="thumbnail-link__text">Создать тренировку</span></a>
                  <a className="thumbnail-link thumbnail-link--theme-light" href="#">
                    <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                      <svg width="30" height="26" aria-hidden="true">
                        <use xlinkHref="#icon-friends"></use>
                      </svg>
                    </div>
                    <span className="thumbnail-link__text">Мои друзья</span>
                  </a>
                  <a className="thumbnail-link thumbnail-link--theme-light" href="#">
                  <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                    <svg width="30" height="26" aria-hidden="true">
                      <use xlinkHref="#icon-bag"></use>
                    </svg>
                  </div><span className="thumbnail-link__text">Мои заказы</span></a>
                <div className="personal-account-coach__calendar">
                  <div className="thumbnail-spec-gym">
                  <div className="thumbnail-spec-gym__image">
                    <picture>
                      <source type="image/webp" srcSet="img/content/thumbnails/nearest-gym-01.webp, img/content/thumbnails/nearest-gym-01@2x.webp 2x" /><img src="img/content/thumbnails/nearest-gym-01.jpg" srcSet="img/content/thumbnails/nearest-gym-01@2x.jpg 2x" width="330" height="190" alt="" />
                    </picture>
                  </div>
                  <p className="thumbnail-spec-gym__type">Ближайший зал</p>
                  <div className="thumbnail-spec-gym__header" style={{textAlign:"center"}}>
                    <h3 className="thumbnail-spec-gym__title">Скоро тут будет интересно</h3>
                  </div>
                </div>
              </div>
              </div>
              <div className="personal-account-coach__additional-info">
                <div className="personal-account-coach__label-wrapper">
                  <h2 className="personal-account-coach__label">Дипломы и сертификаты</h2>
                  <button className="btn-flat btn-flat--underlined personal-account-coach__button" type="button">
                    <svg width="14" height="14" aria-hidden="true">
                      <use xlinkHref="#icon-import"></use>
                    </svg><span>Загрузить</span>
                  </button>
                  <div className="personal-account-coach__controls">
                    <button className="btn-icon personal-account-coach__control" type="button" aria-label="previous">
                      <svg width="16" height="14" aria-hidden="true">
                        <use xlinkHref="#arrow-left"></use>
                      </svg>
                    </button>
                    <button className="btn-icon personal-account-coach__control" type="button" aria-label="next">
                      <svg width="16" height="14" aria-hidden="true">
                        <use xlinkHref="#arrow-right"></use>
                      </svg>
                    </button>
                  </div>
                </div>
                <ul className="personal-account-coach__list">
                  <CoachItemComponent />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
