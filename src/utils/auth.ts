import { session } from '@/utils/sessionStorage';

const TokenKey = 'Admin-Token';

export function getToken() {
  return session.get(TokenKey);
}

export function setToken(token: string) {
  return session.set(TokenKey, token);
}

export function removeToken() {
  return session.remove(TokenKey);
}
