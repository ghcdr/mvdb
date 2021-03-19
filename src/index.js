import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Main } from './contents/Main';
import { GlobalStateProvider } from './state';


ReactDOM.render(
  <React.StrictMode>
    <GlobalStateProvider>
      <Main />
    </GlobalStateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);