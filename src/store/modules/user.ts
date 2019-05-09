import { VuexModule, Module, MutationAction, Mutation, Action, getModule } from 'vuex-module-decorators';
import { login, logout, getInfo } from '@/api/login';
import { getToken, setToken, removeToken } from '@/utils/auth';
import store from '@/store';

export interface IUserState {
  token: string;
  name: string;
  avatar: string;
  roles: string[];
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public token: string = '';
  public name: string = '';
  public avatar: string = '';
  public roles: string[] = [];

  get Token(): string {
    return this.token;
  }

  get Name(): string {
    return this.name;
  }

  get Avatar(): string {
    return this.avatar;
  }

  get Roles(): string[] {
    return this.roles;
  }

  @Mutation
  public SET_TOKEN(token: string) {
    this.token = token;
  }

  @Action({ commit: 'SET_TOKEN' })
  public async Login(userInfo: { username: string, password: string}) {
    const username = userInfo.username.trim();
    const data: any = await login(username, userInfo.password);
    setToken(data.token);
    return data.token;
  }

  @Action({ commit: 'SET_TOKEN' })
  public async FedLogOut() {
    removeToken();
    return '';
  }

  @MutationAction({ mutate: [ 'roles', 'name', 'avatar' ] })
  public async GetInfo() {
    const token: string | null = getToken();
    if (token === undefined) {
      throw Error('GetInfo: token is undefined!');
    }
    const data: any = await getInfo(token);
    if (data.roles && data.roles.length > 0) {
      return {
        roles: data.roles,
        name: data.name,
        avatar: data.avatar,
      };
    } else {
      throw Error('GetInfo: roles must be a non-null array!');
    }
  }

  @MutationAction({ mutate: [ 'token', 'roles' ] })
  public async LogOut() {
    if (getToken() === undefined) {
      throw Error('LogOut: token is undefined!');
    }
    removeToken();
    await logout();
    return {
      token: '',
      roles: [],
    };
  }
}

export const UserModule = getModule(User.prototype);
