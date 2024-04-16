import { TrainingItemClassApplyType} from '../../types';

type PaginationComponentProps = {
  classApply: TrainingItemClassApplyType;
  take: number;
  totalItems: number;
  handleShowMore: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleReturn: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function PaginationComponent({classApply, take, totalItems, handleShowMore, handleReturn}: PaginationComponentProps): JSX.Element {
  return (
    <div className={`show-more ${classApply}__show-more`}>
      {take < totalItems &&
        <button
          className="btn show-more__button show-more__button--more"
          type="button"
          onClick={(evt) => handleShowMore(evt)}
        >Показать еще</button>
      }
      {take === totalItems &&
        <button
          className="btn show-more__button show-more__button--more"
          type="button"
          onClick={(evt) => handleReturn(evt)}
        >Вернуться в начало</button>
      }
  </div>
  )
}
