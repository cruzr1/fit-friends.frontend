import browserHistory from '../../browser-history';
import { BackButtonClassApplyType } from '../../types';

type BackButtonProps ={
  classApply: BackButtonClassApplyType;
}

export default function BackButtonComponent({classApply}: BackButtonProps): JSX.Element {
  return (
    <button
      className={`btn-flat ${classApply}`}
      type="button"
      onClick={() => browserHistory.back()}
      data-testid='buttonBack'
    >
      <svg width="14" height="10" aria-hidden="true">
        <use xlinkHref="#arrow-left"></use>
      </svg><span>Назад</span>
    </button>
  );
}
