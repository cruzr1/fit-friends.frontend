import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectSpecialOffers } from '../../store/training/training.selectors';
import { loadSpecialOffersAction } from '../../store/training/training.actions';
import { adaptImage, adaptOldPrice} from '../../helpers';
import { NULL_VALUE, SpecialSlideNumbers } from '../../const';
import ThumbnailSpecGymComponent from '../thumbnail-spec-gym/thumbnail-spec-gym.component';

export default function SpecialOffersComponent(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      dispatch(loadSpecialOffersAction());
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch]);
  const specialOffers = useAppSelector(selectSpecialOffers);
  const [slideVisible, setSlideVisible] = useState<number>(NULL_VALUE);
  const offerVisible = specialOffers[slideVisible];
  return (
    <section className="special-offers">
      <div className="container">
        <div className="special-offers__wrapper">
          <h2 className="visually-hidden">Специальные предложения</h2>
          {specialOffers.length > 0 &&
                <ul className="special-offers__list">
                  <li className="special-offers__item is-active">
                    <aside className="promo-slider">
                      <div className="promo-slider__overlay"></div>
                      <div className="promo-slider__image"><img src={`/img/content/${adaptImage(offerVisible.backgroundImage)}.png`} srcSet={`/img/content/${adaptImage(offerVisible.backgroundImage)}@2x.png 2x`} width="1040" height="469" alt="promo-background" />
                      </div>
                      <div className="promo-slider__header">
                        <h3 className="promo-slider__title">{offerVisible.name}</h3>
                        <div className="promo-slider__logo">
                          <svg width="74" height="74" aria-hidden="true">
                            <use xlinkHref="#logotype"></use>
                          </svg>
                        </div>
                      </div><span className="promo-slider__text">Горячие предложения на тренировки {offerVisible.trainType}</span>
                      <div className="promo-slider__bottom-container">
                        <div className="promo-slider__slider-dots">
                          {SpecialSlideNumbers.map((name, index) =>
                            (
                              <button
                                key={name}
                                className="promo-slider__slider-dot--active promo-slider__slider-dot"
                                value={index}
                                aria-label={name}
                                onClick={() => setSlideVisible(index)}
                              >
                              </button>
                            )
                          )}
                        </div>
                        <div className="promo-slider__price-container">
                          <p className="promo-slider__price">{offerVisible.price} ₽</p>
                          <p className="promo-slider__sup">за занятие</p>
                          <p className="promo-slider__old-price">{adaptOldPrice(offerVisible.price / 0.9) } ₽</p>
                        </div>
                      </div>
                    </aside>
                  </li>
                </ul>}
          { specialOffers.length === 0 &&
              <ThumbnailSpecGymComponent />}
        </div>
      </div>
    </section>
  );
}
