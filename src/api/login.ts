import { post, get } from '@/api/serve';

export const login = (username: string, password: string) => post('/user/login', { username, password });

export const getInfo = (token: any) => get('/user/info', { token });

export const logout = () => post('/user/logout');
