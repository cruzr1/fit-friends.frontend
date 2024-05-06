export default function BackgroundLogoComponent(): JSX.Element {
  return (
    <div className="background-logo">
      <svg className="background-logo__logo" width="750" height="284" data-testid= "logo" aria-hidden="true">
        <use xlinkHref="#logo-big"></use>
      </svg>
      <svg className="background-logo__icon" width="343" height="343" data-testid= "icon" aria-hidden="true">
        <use xlinkHref="#icon-logotype"></use>
      </svg>
    </div>
  );
}
