export default function PopupMembershipComponent(): JSX.Element {
  return (
    <div className="popup-form popup-form--membership">
      <section className="popup">
        <div className="popup__wrapper">
          <div className="popup-head">
            <h2 className="popup-head__header">Оформить абонемент</h2>
            <button className="btn-icon btn-icon--outlined btn-icon--big" type="button" aria-label="close">
              <svg width="20" height="20" aria-hidden="true">
                <use xlinkHref="#icon-cross"></use>
              </svg>
            </button>
          </div>
          <div className="popup__content popup__content--membership">
            <div className="popup__product">
              <div className="popup__product-image">
                <picture>
                  <source type="image/webp" srcSet="markup/img/content/popup/popup-worldsport.webp, markup/img/content/popup/popup-worldsport@2x.webp 2x" /><img src="markup/img/content/popup/popup-worldsport.jpg" srcSet="markup/img/content/popup/popup-worldsport@2x.jpg 2x" width="98" height="80" alt="" />
                </picture>
              </div>
              <div className="popup__product-info">
                <h3 className="popup__product-title">World Sport</h3>
                <p className="popup__product-price">500 ₽</p>
              </div>
              <div className="popup__product-quantity">
                <p className="popup__quantity">Количество</p>
                <div className="input-quantity">
                  <button className="btn-icon btn-icon--quantity" type="button" aria-label="minus">
                    <svg width="12" height="12" aria-hidden="true">
                      <use xlinkHref="#icon-minus"></use>
                    </svg>
                  </button>
                  <div className="input-quantity__input">
                    <label>
                      <input type="text" value="5" size={2} readOnly />
                    </label>
                  </div>
                  <button className="btn-icon btn-icon--quantity" type="button" aria-label="plus">
                    <svg width="12" height="12" aria-hidden="true">
                      <use xlinkHref="#icon-plus"></use>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <section className="services-check">
              <h4 className="services-check__title">Дополнительные услуги (1000 ₽)</h4>
              <ul className="services-check__list">
                <li className="services-check__item">
                  <div className="custom-toggle custom-toggle--checkbox">
                    <label>
                      <input type="checkbox" value="user-agreement-1" name="user-agreement" /><span className="custom-toggle__icon">
                        <svg width="9" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-check"></use>
                        </svg></span><span className="custom-toggle__label">Бассейн</span>
                    </label>
                  </div>
                </li>
                <li className="services-check__item">
                  <div className="custom-toggle custom-toggle--checkbox">
                    <label>
                      <input type="checkbox" value="user-agreement-1" name="user-agreement" /><span className="custom-toggle__icon">
                        <svg width="9" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-check"></use>
                        </svg></span><span className="custom-toggle__label">Массаж</span>
                    </label>
                  </div>
                </li>
                <li className="services-check__item">
                  <div className="custom-toggle custom-toggle--checkbox">
                    <label>
                      <input type="checkbox" value="user-agreement-1" name="user-agreement" checked /><span className="custom-toggle__icon">
                        <svg width="9" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-check"></use>
                        </svg></span><span className="custom-toggle__label">Сауна</span>
                    </label>
                  </div>
                </li>
                <li className="services-check__item">
                  <div className="custom-toggle custom-toggle--checkbox">
                    <label>
                      <input type="checkbox" value="user-agreement-1" name="user-agreement" /><span className="custom-toggle__icon">
                        <svg width="9" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-check"></use>
                        </svg></span><span className="custom-toggle__label">Детская комната</span>
                    </label>
                  </div>
                </li>
              </ul>
            </section>
            <section className="payment-method">
              <h4 className="payment-method__title">Выберите способ оплаты</h4>
              <ul className="payment-method__list">
                <li className="payment-method__item">
                  <div className="btn-radio-image">
                    <label>
                      <input type="radio" name="payment-membership" aria-label="Visa." /><span className="btn-radio-image__image">
                        <svg width="58" height="20" aria-hidden="true">
                          <use xlinkHref="#visa-logo"></use>
                        </svg></span>
                    </label>
                  </div>
                </li>
                <li className="payment-method__item">
                  <div className="btn-radio-image">
                    <label>
                      <input type="radio" name="payment-membership" aria-label="Мир." checked /><span className="btn-radio-image__image">
                        <svg width="66" height="20" aria-hidden="true">
                          <use xlinkHref="#mir-logo"></use>
                        </svg></span>
                    </label>
                  </div>
                </li>
                <li className="payment-method__item">
                  <div className="btn-radio-image">
                    <label>
                      <input type="radio" name="payment-membership" aria-label="Iomoney." /><span className="btn-radio-image__image">
                        <svg width="106" height="24" aria-hidden="true">
                          <use xlinkHref="#iomoney-logo"></use>
                        </svg></span>
                    </label>
                  </div>
                </li>
              </ul>
            </section>
            <div className="popup__total">
              <p className="popup__total-text">Итого</p>
              <svg className="popup__total-dash" width="310" height="2" aria-hidden="true">
                <use xlinkHref="#dash-line"></use>
              </svg>
              <div>
                <p className="popup__total-price">3&nbsp;500&nbsp;₽&nbsp;</p>
              </div>
            </div>
            <div className="popup__button">
              <button className="btn" type="button">Купить</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
