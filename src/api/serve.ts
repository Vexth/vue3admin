import request from '@/utils/request';

function PostServer(url: string, data?: any) {
  return request({
    url,
    method: 'post',
    data,
  });
}

function GetServer(url: string, params?: any) {
  return request({
    url,
    method: 'get',
    params,
  });
}

function ToObject(item: any): void {
  return (typeof item === 'string') ? JSON.parse(item) : item;
}

export const post = (url: string, data?: any) => PostServer(url, data);
export const get = (url: string, data?: any) => GetServer(url, data);

// const list = {
//   username: 'admin',
//   password: 'advie',
// };
// post('/public/login', list).then((res: any) => console.log(ToObject(res.data)));
