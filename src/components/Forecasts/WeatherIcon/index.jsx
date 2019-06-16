import React from 'react';

const createOneOf = value => (...args) => args.some(a => a === value);

const icon = code => {
  const oneOf = createOneOf(code);

  switch (true) {
    case oneOf(0, 1, 2, 3, 4, 37, 38, 39, 45, 47): return 'thunder';
    case oneOf(5, 6, 7): return 'snowy-6';
    case oneOf(11, 12, 18, 35, 40): return 'rainy-5';
    case oneOf(8, 9): return 'snowy-4';
    case oneOf(10, 17, 25, 41, 42, 43, 46): return 'snowy-6';
    case oneOf(13, 14, 15, 16): return 'snowy-5';
    case oneOf(19): return 'day'
    case oneOf(20, 21, 22, 23, 24): return 'cloudy-day-1';
    case oneOf(26, 44): return 'cloudy';
    case oneOf(27): return 'cloudy-night-3';
    case oneOf(28): return 'cloudy-day-3';
    case oneOf(29): return 'cloudy-night-2';
    case oneOf(30): return 'cloudy-day-2';
    case oneOf(31, 33): return 'night';
    case oneOf(32, 34, 36): return 'day';

    default: 'night';
  }
}

export default ({ code }) => {
  const name = icon(code);

  return (
    <img src={require(`./icons/${name}.svg`)} />
  );
}
