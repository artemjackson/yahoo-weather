import OAuth from 'oauth-1.0a';
import hmacsha1 from 'hmacsha1';

const status = (response) => {
  if (response.ok) return response;

  const error = new Error();
  error.response = response;

  throw error;
};

const json = response => response.json();

export default ({
  appId,
  clientId: key,
  clientSecret: secret,
}) => {
  const oauth = OAuth({
    consumer: { key, secret },
    signature_method: 'HMAC-SHA1',
    nonce_length: 2,
    parameter_seperator: ',',
    hash_function: (data, key) => hmacsha1(key, data),
  });

  return {
    weather: ({ location }) => {
      const url = `https://weather-ydn-yql.media.yahoo.com/forecastrss?format=json&u=c&location=${location}`;
      const method = 'GET';
      const headers = oauth.toHeader(oauth.authorize({ url, method }));

      return fetch(url, {
          method,
          mode: 'cors',
          headers: { ...headers, 'X-Yahoo-App-Id': appId },
        })
        .then(status)
        .then(json);
    },
  };
};

