export default function PurchasesControlsComponent(): JSX.Element {
  return (
    <div className="my-purchases__controls">
      <div className="custom-toggle custom-toggle--switch custom-toggle--switch-right my-purchases__switch" data-validate-type="checkbox">
        <label>
          <input type="checkbox" value="user-agreement-1" name="user-agreement" /><span className="custom-toggle__icon">
            <svg width="9" height="6" aria-hidden="true">
              <use xlinkHref="#arrow-check"></use>
            </svg></span><span className="custom-toggle__label">Только активные</span>
        </label>
      </div>
    </div>
  )
}
