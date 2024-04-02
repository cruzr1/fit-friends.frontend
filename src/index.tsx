import React from 'react';
import ReactDOM from 'react-dom/client';
import browserHistory from './browser-history';
import AppComponent from './components/app/app.component';
import HistoryRouter from './history-router/history-router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <HistoryRouter history={browserHistory}>
      <AppComponent />
    </HistoryRouter>
  </React.StrictMode>
);
