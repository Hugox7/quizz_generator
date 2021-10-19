import { getString, saveString, remove } from './storable';

const JWT_KEY = 'jsonwebtoken_quizz';

export const jwt = {
  get: () => getString(JWT_KEY),
  set: (token) => saveString(JWT_KEY, token),
  remove: () => remove(JWT_KEY),
  has: () => !!getString(JWT_KEY),
};

export const getBearer = () => jwt.has() ? `Bearer ${jwt.get()}` : null;
