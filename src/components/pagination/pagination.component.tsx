import { TrainingItemClassApplyType} from '../../types';

type PaginationComponentProps = {
  classApply: TrainingItemClassApplyType;
}

export default function PaginationComponent({classApply}: PaginationComponentProps): JSX.Element {
  return (
    <div className={`show-more ${classApply}__show-more`}>
      <button className="btn show-more__button show-more__button--more" type="button">Показать еще</button>
      <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
  </div>
  )
}
