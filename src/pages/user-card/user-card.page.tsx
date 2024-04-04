import { BackButtonComponent, TrainingItemComponent, TrainingsListComponent, UserCardContentComponent } from '../../components';
import { BackButtonClassApply, TrainingItemClassApply, UserRole } from '../../const';
import users from '../../mocks/mock-users.json'
import trainings from '../../mocks/mock-trainings.json'

export default function UserCardPage(): JSX.Element {
  const {role, name, location, description, trainType} = users[1];
  const isCoach = role === UserRole.Trainer ? true : false;
  const classApply = isCoach ? 'user-card-coach' : 'user-card';
  return (
    <div className="inner-page inner-page--no-sidebar">
      <div className="container">
        <div className="inner-page__wrapper">
          <BackButtonComponent classApply={BackButtonClassApply.UserCard} />
          <div className="inner-page__content">
            <section className={`${classApply}`}>
              <h1 className="visually-hidden">Карточка пользователя{ isCoach &&' роль тренер'}</h1>
              <div className={`${classApply}__wrapper`}>
                {isCoach &&
                  <div className={`${classApply}__card`}>
                    <UserCardContentComponent {...{ classApply, name, location, isCoach, description, trainType }} />
                  </div>
                }
                {!isCoach &&
                  <UserCardContentComponent {...{ classApply, name, location, isCoach, description, trainType }} />
                }
                {isCoach &&
                  <div className="user-card-coach__training">
                    <div className="user-card-coach__training-head">
                      <h2 className="user-card-coach__training-title">Тренировки</h2>
                      <div className="user-card-coach__training-bts">
                        <button className="btn-icon user-card-coach__training-btn" type="button" aria-label="back">
                          <svg width="14" height="10" aria-hidden="true">
                            <use xlinkHref="#arrow-left"></use>
                          </svg>
                        </button>
                        <button className="btn-icon user-card-coach__training-btn" type="button" aria-label="next">
                          <svg width="14" height="10" aria-hidden="true">
                            <use xlinkHref="#arrow-right"></use>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <ul className="user-card-coach__training-list">
                      {trainings.map(({id, price, name, trainType, calories, description, rating, backgroundImage}) =>
                        <li key={id} className="user-card-coach__training-item">
                          <TrainingItemComponent {...{price, name, trainType, calories, description, rating, backgroundImage}} />
                        </li>
                      )}
                    </ul>
                    <form className="user-card-coach__training-form">
                      <button className="btn user-card-coach__btn-training" type="button">Хочу персональную тренировку</button>
                      <div className="user-card-coach__training-check">
                        <div className="custom-toggle custom-toggle--checkbox">
                          <label>
                            <input type="checkbox" value="user-agreement-1" name="user-agreement" checked /><span className="custom-toggle__icon">
                              <svg width="9" height="6" aria-hidden="true">
                                <use xlinkHref="#arrow-check"></use>
                              </svg></span><span className="custom-toggle__label">Получать уведомление на почту о новой тренировке</span>
                          </label>
                        </div>
                      </div>
                    </form>
                  </div>
                }
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
