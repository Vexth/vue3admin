class Session {
  public get(item: any) {
    return sessionStorage.getItem(item);
  }
  public set(item: any, value: any) {
    return sessionStorage.setItem(item, value);
  }
  public remove(item: any) {
    return sessionStorage.removeItem(item);
  }
}

export const session = new Session();
