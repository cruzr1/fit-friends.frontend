import { BackButtonComponent } from '..';
import { BackButtonClassApply, LocationCaption, Location, TrainTypeCaption, TrainType, Level, LevelCaption, UserRole } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectLocationFilter, selectLevelFilter, selectRoleFilter, selectTrainTypeFilter } from '../../store/user/user.selectors';
import { setLocationFilter, setLevelFilter, setRoleFilter, setTrainTypeFilter } from '../../store/user/user.slice';

export default function UserFilterComponent(): JSX.Element {
  const dispatch = useAppDispatch();
  const locationFilter = useAppSelector(selectLocationFilter);
  const trainTypeFilter = useAppSelector(selectTrainTypeFilter);
  const levelFilter = useAppSelector(selectLevelFilter);
  const roleFilter = useAppSelector(selectRoleFilter);
  return (
    <div className="user-catalog-form">
    <h2 className="visually-hidden">Каталог пользователя</h2>
    <div className="user-catalog-form__wrapper">
      <BackButtonComponent classApply={BackButtonClassApply.UserForm} />
      <h3 className="user-catalog-form__title">Фильтры</h3>
      <form className="user-catalog-form__form">
        <div className="user-catalog-form__block user-catalog-form__block--location">
          <h4 className="user-catalog-form__block-title">Локация, станция метро</h4>
          <ul className="user-catalog-form__check-list">
            {Object.values(Location).map((location) =>
              <li key={location} className="user-catalog-form__check-list-item">
                <div className="custom-toggle custom-toggle--checkbox">
                  <label>
                    <input
                      type="checkbox"
                      value={location}
                      name="user-agreement"
                      onChange={(evt) => dispatch(setLocationFilter(evt.target.value as Location))}
                      checked={locationFilter.includes(location)}
                    /><span className="custom-toggle__icon">
                      <svg width="9" height="6" aria-hidden="true">
                        <use xlinkHref="#arrow-check"></use>
                      </svg></span><span className="custom-toggle__label">{LocationCaption[location]}</span>
                  </label>
                </div>
              </li>
            )}
          </ul>
        </div>
        <div className="user-catalog-form__block user-catalog-form__block--spezialization">
          <h4 className="user-catalog-form__block-title">Специализация</h4>
          <ul className="user-catalog-form__check-list">
            {Object.values(TrainType).map((type) =>
              <li key={type} className="user-catalog-form__check-list-item">
                <div className="custom-toggle custom-toggle--checkbox">
                  <label>
                    <input
                      type="checkbox"
                      value={type}
                      name="spezialization"
                      onChange={(evt) => dispatch(setTrainTypeFilter(evt.target.value as TrainType))}
                      checked={trainTypeFilter.includes(type)}
                      /><span className="custom-toggle__icon">
                      <svg width="9" height="6" aria-hidden="true">
                        <use xlinkHref="#arrow-check"></use>
                      </svg></span><span className="custom-toggle__label">{TrainTypeCaption[type]}</span>
                  </label>
                </div>
              </li>
            )}
          </ul>
        </div>
        <div className="user-catalog-form__block user-catalog-form__block--level">
          <h4 className="user-catalog-form__block-title">Ваш уровень</h4>
          <div className="custom-toggle-radio">
            {Object.values(Level).map((level) =>
              <div key={level} className="custom-toggle-radio__block">
                <label>
                  <input
                    type="radio"
                    name="user-agreement"
                    value={level}
                    onChange={(evt) => dispatch(setLevelFilter(evt.target.value as Level))}
                    checked={levelFilter === level}
                  /><span className="custom-toggle-radio__icon"></span><span className="custom-toggle-radio__label">{LevelCaption[level]}</span>
                </label>
              </div>
            )}
          </div>
        </div>
        <div className="user-catalog-form__block">
          <h3 className="user-catalog-form__title user-catalog-form__title--sort">Сортировка</h3>
          <div className="btn-radio-sort">
            <label>
              <input
                type="radio"
                name="sort"
                onChange={() => dispatch(setRoleFilter(UserRole.Trainer))}
                checked={roleFilter === UserRole.Trainer}
              /><span className="btn-radio-sort__label">Тренеры</span>
            </label>
            <label>
              <input
                type="radio"
                name="sort"
                onChange={() => dispatch(setRoleFilter(UserRole.User))}
                checked={roleFilter === UserRole.User}
              /><span className="btn-radio-sort__label">Пользователи</span>
            </label>
          </div>
        </div>
      </form>
    </div>
  </div>
  )
}
