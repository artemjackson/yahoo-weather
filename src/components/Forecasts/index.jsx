import React from 'react';
import WeatherIcon from './WeatherIcon';
import * as styles from './styles';

const humanDate = timestamp =>
  new Intl.DateTimeFormat([], { month: 'long', day: 'numeric' }).format(timestamp * 1000);

// magic numbers just for demo
const color = temp => `hsl(${180 - temp * 5}, 100%, 45%)`;

export default ({ location, list }) => (
  <section>
    <h1 >Weather in {location.city}</h1>
    <ul className={styles.list}>
      {list.map(({ day, date, high, low, code }) => (
        <li key={date} className={styles.item}>
          <span className={styles.day}>{day}</span>
          <span>{humanDate(date)}</span>
          <WeatherIcon code={code} />
          <div>
            <span style={{ color: color(low) }}>{low}</span>
            <span> - </span>
            <span style={{ color: color(high) }}>{high}</span>
          </div>
        </li>
      ))}
    </ul>
  </section>
);
