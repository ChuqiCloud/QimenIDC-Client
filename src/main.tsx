import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import store from 'modules/store';
import App from 'layouts/index';

import TxcChangeLog from 'txc-change-log';

import 'tdesign-react/es/style/index.css';

import './styles/index.less';

const txcChangeLog = new TxcChangeLog({ id: 602740 });

txcChangeLog.activateChangeLog();

const env = import.meta.env.MODE || 'development';
const baseRouterName = env === 'site' ? '/starter/react/' : '';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = document.getElementById('app')!;

const renderApp = () => {
  ReactDOM.createRoot(root).render(
    <Provider store={store}>
      <HashRouter basename={baseRouterName}>
        <App />
      </HashRouter>
    </Provider>,
  );
};

renderApp();
