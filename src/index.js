import React from 'react';
import { render } from 'react-dom';
import App from 'components/App';
import app from 'app'

const start = ({ search, history }) => render(
  <App
    search={search}
    history={history}
  />,
  document.getElementById('react-root'),
);

app.subscribe(start);

start(app);
