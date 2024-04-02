import { adaptPrice, adaptImage } from '../../helpers';


export type TrainingItemComponentProps = {
  price: number;
  name: string;
  trainType: string;
  calories: number;
  description: string;
  rating: number;
  backgroundImage: string;
}

export default function TrainingItemComponent({price, name, trainType, calories, description, rating, backgroundImage}: TrainingItemComponentProps): JSX.Element {
  return (
    <li className="training-catalog__item">
                  <div className="thumbnail-training">
                    <div className="thumbnail-training__inner">
                      <div className="thumbnail-training__image">
                        <picture>
                          <source type="image/webp" srcSet={`markup/img/content/thumbnails/${adaptImage(backgroundImage)}.webp, markup/img/content/thumbnails/${adaptImage(backgroundImage)}@2x.webp 2x"`} /><img src={`markup/img/content/thumbnails/${adaptImage(backgroundImage)}.jpg" srcSet="markup/img/content/thumbnails/${adaptImage(backgroundImage)}@2x.jpg 2x`} width="330" height="190" alt="" />
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
                        <a className="btn btn--small thumbnail-training__button-catalog" href="#">Подробнее</a>
                        <a className="btn btn--small btn--outlined thumbnail-training__button-catalog" href="#">Отзывы</a>
                      </div>
                    </div>
                  </div>
                </li>
  )
}
