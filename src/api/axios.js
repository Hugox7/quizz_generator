import axios from 'axios';
import jwtDecode from 'jwt-decode';
import routes from '../routing/routes';
import { getBearer, jwt } from '../storage/jwt';
import { refreshToken } from '../storage/refreshToken';

let refreshRequest = null;

const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

async function refreshTokenFromApi() {
  if (!refreshRequest) {
    refreshRequest = client
      .post('/user/refresh-token', { refresh_token: refreshToken.get() })
      .then((res) => {
        if (!res?.data) {
          throw new Error('invalid API response');
        }
        jwt.set(res.data.token);
        refreshToken.set(res.data.refreshToken);
      })
      .catch(() => {
        jwt.remove();
        refreshToken.remove();
        window.location.href = routes.login.path;
      })
      .finally(() => {
        refreshRequest = null;
      });
  }
  return refreshRequest;
}

client.interceptors.request.use(async (config) => {
  const updatedConfig = { ...config };
  if ('authorization' in config.headers && config.headers.authorization) {
    const [type, token] = config.headers.authorization.split(' ');
    if (type === 'Bearer' && token) {
      const payload = jwtDecode(token);
      if (payload.exp < Date.now() / 1000) {
        if (refreshToken.get()) {
          await refreshTokenFromApi();
          updatedConfig.headers.authorization = getBearer();
        }
      }
    }
  }
  return updatedConfig;
})

client.interceptors.response.use(
  (response) => response,
  (error) => {
      throw error;
  },
);

export default client;
