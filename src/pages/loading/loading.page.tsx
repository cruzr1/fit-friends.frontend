import { Helmet } from 'react-helmet-async';
import './loading.styles.css';
import { isStatusPending } from '../../helpers';
import { RequestStatus } from '../../const';

export default function LoadingPage(): JSX.Element {
  const isDataLoading = isStatusPending(RequestStatus.Pending);
  return (
    <div className="spinner-container " data-testid='loading'>
      <Helmet>
        <title>Загрузка страницы — Fit friends</title>
      </Helmet>
      <div className="spinner"></div>
      <div className="text">Пожалуйста подождите . {isDataLoading ? 'Идет загрузка данных...' : 'Идет авторизация...'}</div>
    </div>
  );
}
