import { TrainingItemClassApplyType } from '../../types';

type BackButtonProps ={
  classApply: TrainingItemClassApplyType;
  isTrainingFilter?: boolean
}

export default function BackButtonComponent({classApply, isTrainingFilter}: BackButtonProps): JSX.Element {
  return (
    <button className={`btn-flat ${isTrainingFilter ? classApply : `${classApply}__back`}`} type="button">
      <svg width="14" height="10" aria-hidden="true">
        <use xlinkHref="#arrow-left"></use>
      </svg><span>Назад</span>
    </button>
  )
}
