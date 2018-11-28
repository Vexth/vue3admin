import { post, get } from '@/api/serve';

export const login = (username: string, password: string) => post('/user/login', { username, password });

export const getInfo = (token: any) => get('/user/info', { token });

export const logout = () => post('/user/logout');

export const adminrouter = () => get('/user/router');

export const antrouter = () => get('https://www.easy-mock.com/mock/5a5da330d9b48c260cb42ca8/example/antrouter');
