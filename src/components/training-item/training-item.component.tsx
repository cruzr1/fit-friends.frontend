import { AppRoute } from '../../const';
import { adaptPrice, adaptImage } from '../../helpers';
import { Link, generatePath } from 'react-router-dom';


export type TrainingItemComponentProps = {
  id: string;
  price: number;
  name: string;
  trainType: string;
  calories: number;
  description: string;
  rating: number;
  backgroundImage: string;
  isOrdered?: boolean;
  trainingsCount?: number;
  trainingsSum?: number;

}

export default function TrainingItemComponent({id, price, name, trainType, calories, description, rating, backgroundImage, isOrdered, trainingsCount, trainingsSum}: TrainingItemComponentProps): JSX.Element {
  return (
    <div className="thumbnail-training">
      <div className="thumbnail-training__inner">
        <div className="thumbnail-training__image">
          <picture>
            <source type="image/webp" srcSet={`/img/content/thumbnails/${adaptImage(backgroundImage)}.webp, "/img/content/thumbnails/${adaptImage(backgroundImage)}@2x.webp 2x`} /><img src={`/img/content/thumbnails/${adaptImage(backgroundImage)}.jpg srcSet="/img/content/thumbnails/${adaptImage(backgroundImage)}@2x.jpg 2x`} width="330" height="190" alt="" />
          </picture>
        </div>
        <p className="thumbnail-training__price">{adaptPrice(price)}
        </p>
        <h3 className="thumbnail-training__title">{name}</h3>
        <div className="thumbnail-training__info">
          <ul className="thumbnail-training__hashtags-list">
            <li className="thumbnail-training__hashtags-item">
              <div className="hashtag thumbnail-training__hashtag"><span>#{trainType}</span></div>
            </li>
            <li className="thumbnail-training__hashtags-item">
              <div className="hashtag thumbnail-training__hashtag"><span>#{calories}ккал</span></div>
            </li>
          </ul>
          <div className="thumbnail-training__rate">
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg><span className="thumbnail-training__rate-value">{rating}</span>
          </div>
        </div>
        <div className="thumbnail-training__text-wrapper">
          <p className="thumbnail-training__text">{description}</p>
        </div>
        <div className="thumbnail-training__button-wrapper">
          {!isOrdered &&
              <>
                <Link className="btn btn--small thumbnail-training__button-catalog" to={generatePath(AppRoute.TrainingCard, {trainingId: id || ''})}>Подробнее</Link>
                <Link className="btn btn--small btn--outlined thumbnail-training__button-catalog" to={generatePath(AppRoute.TrainingCard, {trainingId: id || ''})}>Отзывы</Link>
              </>}
          {isOrdered &&
              <Link className="btn-flat btn-flat--underlined thumbnail-training__button-orders" to={generatePath(AppRoute.TrainingCard, {trainingId: id || ''})}>
                <svg width="18" height="18" aria-hidden="true">
                  <use xlinkHref="#icon-info"></use>
                </svg><span>Подробнее</span>
              </Link>}
        </div>
      </div>
      {isOrdered &&
          <div className="thumbnail-training__total-info">
            <div className="thumbnail-training__total-info-card">
              <svg width="32" height="32" aria-hidden="true">
                <use xlinkHref="#icon-chart"></use>
              </svg>
              <p className="thumbnail-training__total-info-value">{trainingsCount}</p>
              <p className="thumbnail-training__total-info-text">Куплено тренировок</p>
            </div>
            <div className="thumbnail-training__total-info-card">
              <svg width="31" height="28" aria-hidden="true">
                <use xlinkHref="#icon-wallet"></use>
              </svg>
              <p className="thumbnail-training__total-info-value">{trainingsSum}<span>₽</span></p>
              <p className="thumbnail-training__total-info-text">Общая сумма</p>
            </div>
          </div>}
    </div>

  );
}
