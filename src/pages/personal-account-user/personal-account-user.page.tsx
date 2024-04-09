import { Link } from 'react-router-dom'
import { UserInfoComponent, UserScheduleComponent } from '../../components'
import { AppRoute } from '../../const'

export default function PersonalAccountUserPage(): JSX.Element {
  return (
    <section className="inner-page">
      <div className="container">
        <div className="inner-page__wrapper">
          <h1 className="visually-hidden">Личный кабинет</h1>
          <UserInfoComponent />
          <div className="inner-page__content">
            <div className="personal-account-user">
              <UserScheduleComponent />
              <div className="personal-account-user__additional-info">
                <Link className="thumbnail-link thumbnail-link--theme-light" to={AppRoute.MyFriends}>
                  <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                    <svg width="30" height="26" aria-hidden="true">
                      <use xlinkHref="#icon-friends"></use>
                    </svg>
                  </div>
                  <span className="thumbnail-link__text">Мои друзья</span>
                </Link>
                <Link className="thumbnail-link thumbnail-link--theme-light" to={AppRoute.MyPurchases}>
                  <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                    <svg width="30" height="26" aria-hidden="true">
                      <use xlinkHref="#icon-shopping-cart"></use>
                    </svg>
                  </div>
                  <span className="thumbnail-link__text">Мои покупки</span>
                </Link>
                <div className="thumbnail-spec-gym">
                  <div className="thumbnail-spec-gym__image">
                    <picture>
                      <source type="image/webp" srcSet="markup/img/content/thumbnails/nearest-gym-01.webp, markup/img/content/thumbnails/nearest-gym-01@2x.webp 2x" /><img src="markup/img/content/thumbnails/nearest-gym-01.jpg" srcSet="markup/img/content/thumbnails/nearest-gym-01@2x.jpg 2x" width="330" height="190" alt="" />
                    </picture>
                  </div>
                  <p className="thumbnail-spec-gym__type">Ближайший зал</p>
                  <div className="thumbnail-spec-gym__header" style={{textAlign:"center"}}>
                    <h3 className="thumbnail-spec-gym__title">Скоро тут появится что-то полезное</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
