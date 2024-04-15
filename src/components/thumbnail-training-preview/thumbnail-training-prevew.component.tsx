import { Link, generatePath } from 'react-router-dom';
import { TrainType, AppRoute } from '../../const';

type ThumbnailTrainingPreviewComponentProps = {
  id: string;
  trainType: TrainType;
}

export default function ThumbnailTrainingPreviewComponent({id, trainType}: ThumbnailTrainingPreviewComponentProps): JSX.Element {
  return (
    <div className="thumbnail-preview">
      <div className="thumbnail-preview__image">
        <picture>
          <source type="image/webp" srcSet="markup/img/content/thumbnails/preview-03.webp, markup/img/content/thumbnails/preview-03@2x.webp 2x" /><img src="markup/img/content/thumbnails/preview-03.jpg" srcSet="markup/img/content/thumbnails/preview-03@2x.jpg 2x" width="452" height="191" alt="" />
        </picture>
      </div>
      <div className="thumbnail-preview__inner">
        <h3 className="thumbnail-preview__title">{trainType}</h3>
        <div className="thumbnail-preview__button-wrapper">
          <Link className="btn btn--small thumbnail-preview__button" to={generatePath(AppRoute.TrainingCard, {trainingId: id || ''})}>Подробнее</Link>
        </div>
      </div>
    </div>
  )
}
