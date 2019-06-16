import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './styles';

const Page = (loader) => {
  const Lazy = lazy(loader);

  return (props) => (
    <Suspense fallback="..." >
      <Lazy {...props} />
    </Suspense>
  );
};

const SearchHistoryPage = Page(() => import('./SearchHistory'));
const SearchPage = Page(() => import('./Search/index.jsx'));

export default ({ history, search }) => (
  <Router>
    <Route
      path="/"
      exact
      render={() => (
        <SearchHistoryPage
          history={history}
        />
      )}
    />
    <Route
      path="/search"
      render={({ location }) => (
        <SearchPage
          initialSearch={new URLSearchParams(location.search).get('input') || ''}
          search={search}
        />
      )}
    />
  </Router>
);

