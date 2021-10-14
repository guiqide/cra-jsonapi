import { interceptor } from './jsonapi-fetch';

const fetch = interceptor({
  credentials: 'include',
});
console.log('asdf');

fetch.get('/api');
