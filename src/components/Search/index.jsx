import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Forecasts from '../Forecasts';
import Loading from './Loading';
import * as styles from './styles';

const INITIAL_LOADING = false;
const INITIAL_ERROR = null;
const INITIAL_DATA = {
  location: {},
  currentObservation: {},
  forecasts: [],
};

export default ({ initialSearch = '', search: doSearch }) => {
  const [input, setInput] = useState(initialSearch);
  const [loading, setLoading] = useState(INITIAL_LOADING);
  const [error, setError] = useState(INITIAL_ERROR);
  const [data, setData] = useState(INITIAL_DATA);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(async () => {
      await search(input);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [input]);

  const search = async (location) => {
    try {
      const result = await doSearch({ location });

      setError(null);
      setData({
        location: result.location,
        currentObservation: result.current_observation,
        forecasts: result.forecasts,
      });
    } catch (error) {
      setError(error);
      setData(INITIAL_DATA);
      console.warn(error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    await search(input);
    setLoading(false);
   };

  const onChange = (e) => setInput(e.target.value);

  return (
    <div className={styles.page}>
      <nav className={styles.navbar}>
        Back to <Link to="/">Search History</Link>
      </nav>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.search}>
          <input className={styles.input} value={input} onChange={onChange}/>
          <label className={styles.label}>Location</label>
        </div>
        <button className={styles.button} type="submit" disabled={loading}>
          {input
            ? 'Re-search'
            : 'Search'
          }
        </button>
      </form>
      {!input
        ? ''
        :loading
          ? <div className={styles.loading}><Loading /></div>
          : error
            ? <span>Ooops an error occurred</span>
            : !data.location.city
              ? <span>Nothing is found</span>
              : <Forecasts
                  location={data.location}
                  list={data.forecasts}
                />
      }
    </div>
  );
};
