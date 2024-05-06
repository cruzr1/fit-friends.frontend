import { BackButtonComponent, RangeSliderComponent } from '..';
import { BackButtonClassApply, TrainTypeCaption, TrainType, SortOrder, NULL_VALUE, MAXIMUM_PRICE_VALUE, MAXIMUM_CALORIES_VALUE, MAXIMUM_RATING_VALUE, ShowValue, Duration, QuestionDurationCaption } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectCaloriesFilter, selectDurationFilter, selectPriceFilter, selectRatingFilter, selectSortByOrder, selectTrainTypeFilter } from '../../store/training/training.selectors';
import { setCaloriesFilter, setDurationFilter, setPriceFilter, setRatingFilter, setSortByOrder, setTrainTypeFilter } from '../../store/training/training.slice';
import { ChangeEvent } from 'react';

export type TrainingFilterComponentProps = {
  isMyTrainingsPage?: boolean;
}

export default function TrainingFilterComponent({isMyTrainingsPage}: TrainingFilterComponentProps): JSX.Element {
  const classApply = isMyTrainingsPage ? 'my-training' : 'gym-catalog';
  const dispatch = useAppDispatch();
  const backButtonClassApply = isMyTrainingsPage ? BackButtonClassApply.TrainingForm : BackButtonClassApply.TrainingCatalog;
  const [priceMin, priceMax] = useAppSelector(selectPriceFilter);
  const [caloriesMin, caloriesMax] = useAppSelector(selectCaloriesFilter);
  const [ratingMin, ratingMax] = useAppSelector(selectRatingFilter);
  const trainTypeFilter = useAppSelector(selectTrainTypeFilter);
  const sortByOrder = useAppSelector(selectSortByOrder);
  const durationFilter = useAppSelector(selectDurationFilter);
  const handleTrainTypeFilterChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (trainTypeFilter.includes(evt.target.value as TrainType)) {
      dispatch(setTrainTypeFilter(trainTypeFilter.filter((type) => type !== evt.target.value)));
    } else {
      dispatch(setTrainTypeFilter(trainTypeFilter.concat(evt.target.value as TrainType)));
    }
  };
  const handlePriceSlideChange = (value: number[]) => {
    dispatch(setPriceFilter(value));
  };
  const handleCaloriesSlideChange = (value: number[]) => {
    dispatch(setCaloriesFilter(value));
  };
  const handleRatingSlideChange = (value: number[]) => {
    dispatch(setRatingFilter(value));
  };
  return (
    <div className={`${classApply}-form`} data-testid='filter'>
      <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
      <div className={`${classApply}-form__wrapper`}>
        <BackButtonComponent classApply={backButtonClassApply} />
        <h3 className={`${classApply}-form__title`}>Фильтры</h3>
        <form className={`${classApply}-form__form`}>
          <div className={`${classApply}-form__block ${classApply}-form__block--price`}>
            <h4 className={`${classApply}-form__block-title`}>Цена, ₽</h4>
            <div className="filter-price">
              <div className="filter-price__input-text filter-price__input-text--min">
                <input
                  type="text"
                  id="text-min"
                  name="text-min"
                  value={priceMin}
                  onChange={(evt) => dispatch(setPriceFilter([+evt.target.value, priceMax]))}
                />
                <label htmlFor="text-min">от</label>
              </div>
              <div className="filter-price__input-text filter-price__input-text--max">
                <input
                  type="text"
                  id="text-max"
                  name="text-max"
                  value={priceMax}
                  onChange={(evt) => dispatch(setPriceFilter([priceMin, +evt.target.value]))}
                />
                <label htmlFor="text-max">до</label>
              </div>
            </div>
            <RangeSliderComponent
              value={[priceMin, priceMax]}
              maxValue={MAXIMUM_PRICE_VALUE}
              handleSliderChange={handlePriceSlideChange}
              showValue={ShowValue.Off}
            />
          </div>
          <div className={`${classApply}-form__block ${classApply}-form__block--calories`}>
            <h4 className={`${classApply}-form__block-title`}>Калории</h4>
            <div className="filter-calories">
              <div className="filter-calories__input-text filter-calories__input-text--min">
                <input
                  type="text"
                  id="text-min-cal"
                  name="text-min-cal"
                  value={caloriesMin}
                  onChange={(evt) => dispatch(setCaloriesFilter([+evt.target.value, caloriesMax]))}
                />
                <label htmlFor="text-min-cal">от</label>
              </div>
              <div className="filter-calories__input-text filter-calories__input-text--max">
                <input
                  type="text"
                  id="text-max-cal"
                  name="text-max-cal"
                  value={caloriesMax}
                  onChange={(evt) => dispatch(setCaloriesFilter([caloriesMin, +evt.target.value]))}
                />
                <label htmlFor="text-max-cal">до</label>
              </div>
            </div>
            <RangeSliderComponent
              value={[caloriesMin, caloriesMax]}
              maxValue={MAXIMUM_CALORIES_VALUE}
              handleSliderChange={handleCaloriesSlideChange}
              showValue={ShowValue.Off}
            />
          </div>
          <div className={`${classApply}-form__block ${classApply}-form__block--rating`}>
            <h4 className={`${classApply}-form__block-title`}>Рейтинг</h4>
            <RangeSliderComponent
              value={[ratingMin, ratingMax]}
              maxValue={MAXIMUM_RATING_VALUE}
              handleSliderChange={handleRatingSlideChange}
              showValue={ShowValue.Auto}
            />
          </div>
          {isMyTrainingsPage &&
            <div className="my-training-form__block my-training-form__block--duration">
              <h4 className="my-training-form__block-title">Длительность</h4>
              <ul className="my-training-form__check-list">
                {Object.values(Duration).map((duration) =>
                  (
                    <li key={duration} className="my-training-form__check-list-item">
                      <div className="custom-toggle custom-toggle--checkbox">
                        <label>
                          <input
                            type="checkbox"
                            value={duration}
                            name="duration"
                            checked={duration === durationFilter}
                            onChange={(evt) => dispatch(setDurationFilter(evt.target.value as Duration))}
                          />
                          <span className="custom-toggle__icon">
                            <svg width="9" height="6" aria-hidden="true">
                              <use xlinkHref="#arrow-check"></use>
                            </svg>
                          </span><span className="custom-toggle__label">{QuestionDurationCaption[duration]}</span>
                        </label>
                      </div>
                    </li>
                  )
                )}
              </ul>
            </div>}
          {!isMyTrainingsPage &&
            <>
              <div className={`${classApply}-form__block ${classApply}-form__block--type`}>
                <h4 className={`${classApply}-form__block-title`}>Тип</h4>
                <ul className={`${classApply}-form__check-list`}>
                  {Object.values(TrainType).map((type) =>
                    (
                      <li key={type} className={`${classApply}-form__check-list-item`}>
                        <div className="custom-toggle custom-toggle--checkbox">
                          <label>
                            <input
                              type="checkbox"
                              value={type}
                              name="type"
                              checked={trainTypeFilter.includes(type)}
                              onChange={(evt) => handleTrainTypeFilterChange(evt)}
                            />
                            <span className="custom-toggle__icon">
                              <svg width="9" height="6" aria-hidden="true">
                                <use xlinkHref="#arrow-check"></use>
                              </svg>
                            </span><span className="custom-toggle__label">{TrainTypeCaption[type]}</span>
                          </label>
                        </div>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className={`${classApply}-form__block ${classApply}-form__block--sort`}>
                <h4 className={`${classApply}-form__title ${classApply}-form__title--sort`}>Сортировка</h4>
                <div className={`btn-radio-sort ${classApply}-form__radio`}>
                  <label>
                    <input
                      type="radio"
                      name="sort"
                      checked={sortByOrder === SortOrder.Asc}
                      onChange={() => dispatch(setSortByOrder(SortOrder.Asc))}
                    /><span className="btn-radio-sort__label">Дешевле</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="sort"
                      checked={sortByOrder === SortOrder.Desc}
                      onChange={() => dispatch(setSortByOrder(SortOrder.Desc))}
                    /><span className="btn-radio-sort__label">Дороже</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="sort"
                      checked={priceMin === NULL_VALUE && priceMax === NULL_VALUE}
                      onChange={() => dispatch(setPriceFilter([0, 0]))}
                    /><span className="btn-radio-sort__label">Бесплатные</span>
                  </label>
                </div>
              </div>
            </>}
        </form>
      </div>
    </div>
  );
}
