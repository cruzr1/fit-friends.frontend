import { adaptImage } from '../../helpers';

type ReviewItemComponentProps = {
  name: string;
  comment: string;
  avatar: string;
  rating: number;
}

export default function ReviewItemComponent({name, avatar, comment, rating}: ReviewItemComponentProps): JSX.Element {
  return (
    <div className="review">
      <div className="review__user-info">
        <div className="review__user-photo">
          <picture>
            <source type="image/webp" srcSet={`/img/content/avatars/users//${adaptImage(avatar)}.webp, /img/content/avatars/users//${adaptImage(avatar)}@2x.webp 2x`} /><img src={`/img/content/avatars/users//${adaptImage(avatar)}.png" srcSet="/img/content/avatars/users//${adaptImage(avatar)}@2x.png 2x`} width="64" height="64" alt="Изображение пользователя" />
          </picture>
        </div><span className="review__user-name">{name}</span>
        <div className="review__rating">
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-star"></use>
          </svg><span>{rating}</span>
        </div>
      </div>
      <p className="review__comment">{comment}</p>
    </div>
  );
}
