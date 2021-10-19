import { getBearer } from '../storage/jwt';
import axios from './axios';

function call(method, url, options = {}, restricted = true) {
  const headers = {};
  if (restricted) {
    headers.authorization = getBearer();
  }

  return axios
    .request({
      method,
      url,
      responseType: 'json',
      ...options,
      headers: { ...headers, ...options.headers },
    })
}

const ApiService = {
  get: (path, params, options = {}) => call('GET', path, { params, ...options }),
  put: (path, data, options = {}) => call('PUT', path, { data, ...options }),
  post:  (path, data, options = {}) => call('POST', path, { data, ...options }),
  delete: (path, options) => call('DELETE', path, options),
  getWithoutJwt: (path, params, options = {}) => call('GET', path, { params, ...options }, false),
  postWithoutJwt:  (path, data, options = {}) => call('POST', path, { data, ...options }, false),
}

export default ApiService;
