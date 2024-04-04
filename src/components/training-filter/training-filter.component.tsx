import { BackButtonComponent } from '..';
import { BackButtonClassApply, DurationCaption, TrainTypeCaption } from '../../const';

export type TrainingFilterComponentProps = {
  isMyTrainingsPage?: boolean;
}

export default function TrainingFilterComponent({isMyTrainingsPage}: TrainingFilterComponentProps): JSX.Element {
  const classApply = isMyTrainingsPage ? 'my-training' : 'gym-catalog';
  const backButtonClassApply = isMyTrainingsPage ? BackButtonClassApply.TrainingForm : BackButtonClassApply.TrainingCatalog
  return (
    <div className={`${classApply}-form`}>
      <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
      <div className={`${classApply}-form__wrapper`}>
        <BackButtonComponent classApply={backButtonClassApply} />
        <h3 className={`${classApply}-form__title`}>Фильтры</h3>
        <form className={`${classApply}-form__form`}>
          <div className={`${classApply}-form__block ${classApply}-form__block--price`}>
            <h4 className={`${classApply}-form__block-title`}>Цена, ₽</h4>
            <div className="filter-price">
              <div className="filter-price__input-text filter-price__input-text--min">
                <input type="number" id="text-min" name="text-min" value="0" />
                <label htmlFor="text-min">от</label>
              </div>
              <div className="filter-price__input-text filter-price__input-text--max">
                <input type="number" id="text-max" name="text-max" value="3200" />
                <label htmlFor="text-max">до</label>
              </div>
            </div>
            <div className="filter-range">
              <div className="filter-range__scale">
                <div className="filter-range__bar"><span className="visually-hidden">Полоса прокрутки</span></div>
              </div>
              <div className="filter-range__control">
                <button className="filter-range__min-toggle"><span className="visually-hidden">Минимальное значение</span></button>
                <button className="filter-range__max-toggle"><span className="visually-hidden">Максимальное значение</span></button>
              </div>
            </div>
          </div>
          <div className={`${classApply}-form__block ${classApply}-form__block--calories`}>
            <h4 className={`${classApply}-form__block-title`}>Калории</h4>
            <div className="filter-calories">
              <div className="filter-calories__input-text filter-calories__input-text--min">
                <input type="number" id="text-min-cal" name="text-min-cal" />
                <label htmlFor="text-min-cal">от</label>
              </div>
              <div className="filter-calories__input-text filter-calories__input-text--max">
                <input type="number" id="text-max-cal" name="text-max-cal" />
                <label htmlFor="text-max-cal">до</label>
              </div>
            </div>
            <div className="filter-range">
              <div className="filter-range__scale">
                <div className="filter-range__bar"><span className="visually-hidden">Полоса прокрутки</span></div>
              </div>
              <div className="filter-range__control">
                <button className="filter-range__min-toggle"><span className="visually-hidden">Минимальное значение</span></button>
                <button className="filter-range__max-toggle"><span className="visually-hidden">Максимальное значение</span></button>
              </div>
            </div>
          </div>
          <div className={`${classApply}-form__block ${classApply}-form__block--rating`}>
            <h4 className={`${classApply}-form__block-title`}>Рейтинг</h4>
            <div className="filter-raiting">
              <div className="filter-raiting__scale">
                <div className="filter-raiting__bar"><span className="visually-hidden">Полоса прокрутки</span></div>
              </div>
              <div className="filter-raiting__control">
                <button className="filter-raiting__min-toggle"><span className="visually-hidden">Минимальное значение</span></button><span>1</span>
                <button className="filter-raiting__max-toggle"><span className="visually-hidden">Максимальное значение</span></button><span>5</span>
              </div>
            </div>
          </div>
          {isMyTrainingsPage &&
            <div className="my-training-form__block my-training-form__block--duration">
              <h4 className="my-training-form__block-title">Длительность</h4>
              <ul className="my-training-form__check-list">
                {Object.values(DurationCaption).map((duration) =>
                  <li key={duration} className="my-training-form__check-list-item">
                  <div className="custom-toggle custom-toggle--checkbox">
                    <label>
                      <input type="checkbox" value="duration-1" name="duration" /><span className="custom-toggle__icon">
                        <svg width="9" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-check"></use>
                        </svg></span><span className="custom-toggle__label">{duration}</span>
                    </label>
                  </div>
                </li>
                )}
              </ul>
            </div>
          }
          {!isMyTrainingsPage &&
            <>
              <div className={`${classApply}-form__block ${classApply}-form__block--type`}>
                <h4 className={`${classApply}-form__block-title`}>Тип</h4>
                <ul className={`${classApply}-form__check-list`}>
                  {Object.values(TrainTypeCaption).map((type) =>
                    <li key={type} className={`${classApply}-form__check-list-item`}>
                      <div className="custom-toggle custom-toggle--checkbox">
                        <label>
                          <input type="checkbox" value="type-1" name="type" /><span className="custom-toggle__icon">
                            <svg width="9" height="6" aria-hidden="true">
                              <use xlinkHref="#arrow-check"></use>
                            </svg></span><span className="custom-toggle__label">{type}</span>
                        </label>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
              <div className={`${classApply}-form__block ${classApply}-form__block--sort`}>
                <h4 className={`${classApply}-form__title ${classApply}-form__title--sort`}>Сортировка</h4>
                <div className="btn-radio-sort ${classApply}-form__radio">
                  <label>
                    <input type="radio" name="sort" checked /><span className="btn-radio-sort__label">Дешевле</span>
                  </label>
                  <label>
                    <input type="radio" name="sort" /><span className="btn-radio-sort__label">Дороже</span>
                  </label>
                  <label>
                    <input type="radio" name="sort" /><span className="btn-radio-sort__label">Бесплатные</span>
                  </label>
                </div>
              </div>
            </>
          }
        </form>
      </div>
    </div>
  )
}
