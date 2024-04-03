import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './store/store';
import browserHistory from './browser-history';
import { authoriseUserAction } from './store/user/user.actions';
import AppComponent from './components/app/app.component';
import HistoryRouter from './history-router/history-router';
import { updateAuthStatus } from './store/user/user.slice';
import { AuthStatus } from './const';


store.dispatch(updateAuthStatus(AuthStatus.Unknown));
store.dispatch(authoriseUserAction());
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
