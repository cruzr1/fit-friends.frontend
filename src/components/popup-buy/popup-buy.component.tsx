import { useEffect, useState } from 'react';
import { adaptImage, adaptPrice, adaptType, adaptValue, blockPage, unblockPage } from '../../helpers';
import { TrainingType } from '../../types';
import { DEFAULT_ORDER_COUNT, KEY_ESCAPE, OrderPayment, Payment } from '../../const';
import { useAppDispatch } from '../../hooks/hooks';
import { orderTrainingsAction } from '../../store/user/user.actions';

type PopupBuyComponentProps = {
  training: TrainingType;
  handlePopupClose: () => void;
}

export default function PopupBuyComponent({training, handlePopupClose}: PopupBuyComponentProps): JSX.Element {
  const dispatch = useAppDispatch()
  const {backgroundImage, price, id} = training;
  const [count, setCount] = useState<number>(DEFAULT_ORDER_COUNT);
  const [payment, setPayment] = useState<Payment>(Payment.Visa);
  useEffect(() => {
    let isMounted = true;
    blockPage()
    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === KEY_ESCAPE) {
        handlePopupClose()
      }
    }
    document.addEventListener('keydown', (evt) => handleKeyDown(evt));
    return () => {
      isMounted = false;
      unblockPage()
    }
  }, [])
  const handleBuyClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    dispatch(orderTrainingsAction({
      orderType: OrderPayment.Subscription,
      trainingId: id,
      trainingsCount: count,
      payment,
    }))
    handlePopupClose();
  }
  return (
    <div
      className="popup-form popup-form--buy">
      <section className="popup">
        <div className="popup__wrapper">
          <div className="popup-head">
            <h2 className="popup-head__header">Купить тренировку</h2>
            <button
              className="btn-icon btn-icon--outlined btn-icon--big"
              type="button"
              aria-label="close"
              onClick={handlePopupClose}
            >
              <svg width="20" height="20" aria-hidden="true">
                <use xlinkHref="#icon-cross"></use>
              </svg>
            </button>
          </div>
          <div className="popup__content popup__content--purchases">
            <div className="popup__product">
              <div className="popup__product-image">
                <picture>
                  <source type="image/webp" srcSet={`/img/content/popup/${adaptImage(backgroundImage)}.webp, /img/content/popup/${adaptImage(backgroundImage)}@2x.webp 2x`} /><img src={`/img/content/popup/${adaptImage(backgroundImage)}.jpg" srcSet="/img/content/popup/${adaptImage(backgroundImage)}@2x.jpg 2x`} width="98" height="80" alt="" />
                </picture>
              </div>
              <div className="popup__product-info">
                <h3 className="popup__product-title">energy</h3>
                <p className="popup__product-price">{adaptPrice(price)}</p>
              </div>
              <div className="popup__product-quantity">
                <p className="popup__quantity">Количество</p>
                <div className="input-quantity">
                  <button
                    className="btn-icon btn-icon--quantity"
                    type="button"
                    aria-label="minus"
                    onClick={() => setCount((count) => count - 1)}
                  >
                    <svg width="12" height="12" aria-hidden="true">
                      <use xlinkHref="#icon-minus"></use>
                    </svg>
                  </button>
                  <div className="input-quantity__input">
                    <label>
                      <input
                        type="number"
                        value={count}
                        size={2}
                        readOnly
                      />
                    </label>
                  </div>
                  <button
                    className="btn-icon btn-icon--quantity"
                    type="button"
                    aria-label="plus"
                    onClick={() => setCount((count) => count + 1)}
                  >
                    <svg width="12" height="12" aria-hidden="true">
                      <use xlinkHref="#icon-plus"></use>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <section className="payment-method">
              <h4 className="payment-method__title">Выберите способ оплаты</h4>
              <ul className="payment-method__list">
                {Object.values(Payment).map((type) =>
                  <li key={type} className="payment-method__item">
                    <div className="btn-radio-image">
                      <label>
                        <input
                          type="radio"
                          name="payment-purchases"
                          aria-label={type}
                          value={type}
                          checked={type === payment}
                          onChange={(evt) => setPayment(evt.target.value as Payment)}
                        /><span className="btn-radio-image__image">
                          <svg width="58" height="20" aria-hidden="true">
                            <use xlinkHref={`#${adaptType(type)}-logo`}></use>
                          </svg></span>
                      </label>
                    </div>
                  </li>
                )}
              </ul>
            </section>
            <div className="popup__total">
              <p className="popup__total-text">Итого</p>
              <svg className="popup__total-dash" width="310" height="2" aria-hidden="true">
                <use xlinkHref="#dash-line"></use>
              </svg>
              <p className="popup__total-price">{adaptValue(count * price)}</p>
            </div>
            <div className="popup__button">
              <button
                className="btn"
                type="button"
                onClick={(evt) => handleBuyClick(evt)}
              >Купить</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
