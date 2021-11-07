import { getString, saveString, remove } from './storable';

const REFRESH_TOKEN_KEY = 'refreshtoken_quizz';

export const refreshToken = {
  get: () => getString(REFRESH_TOKEN_KEY),
  set: (token) => saveString(REFRESH_TOKEN_KEY, token),
  remove: () => remove(REFRESH_TOKEN_KEY),
  has: () => !!getString(REFRESH_TOKEN_KEY),
};
