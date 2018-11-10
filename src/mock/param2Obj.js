export function param2Obj(url) {
  const search = url.split('?')[1];
  if (!search) {
    return {};
  }
  const r = decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"');
  return JSON.parse(`{"${r}"}`);
}
