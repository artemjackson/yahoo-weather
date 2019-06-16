import React from 'react';
import { Link } from 'react-router-dom';
import * as styles from './styles';

export default ({ history = [] }) => (
  <section className={styles.page}>
    {!history.length
      ? (
        <main className={styles.notFound}>
          <h1>The is no Search history yet</h1>
          <p>Go to <Link to="/search">Search</Link></p>
        </main>
      )
      : (
        <main className={styles.history}>
          <h1>Previously searched:</h1>
          <ul className={styles.list}>
            {history.map(item => (
              <li key={item} className={styles.item}>
                <Link to={`/search?input=${item}`}>{item}</Link>
              </li>
            ))}
          </ul>
        </main>
      )
    }
  </section>
);
