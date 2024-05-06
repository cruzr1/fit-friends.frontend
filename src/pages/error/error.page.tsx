import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AppRoute } from '../../const';

export default function ErrorPage (): JSX.Element {
  const navigate = useNavigate();
  return (
    <div className="container">
      <Helmet>
        <title>404 — Fit friends</title>
      </Helmet>
      <section className="error" data-testid='error'>
        <h1 className="error__title">404</h1><span className="error__subtitle">Страница не найдена.</span>
        <p className="error__text"> Возможно, страница была удалена или<br/>её вовсе не существовало.</p>
        <button
          className="button button__error button--small button--black-border"
          onClick={() => navigate(AppRoute.Index)}
        >Продолжить работу
        </button>
      </section>
    </div>
  );
}
