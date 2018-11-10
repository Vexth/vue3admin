import { get } from '@/api/serve';

export const getList = (data: any) => get('/article/list', data);
