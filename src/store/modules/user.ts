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

  @Mutation
  public SET_TOKEN(token: string) {
    this.token = token;
  }

  @Action({ commit: 'SET_TOKEN' })
  public async Login(userInfo: { username: string, password: string}) {
    const username = userInfo.username.trim();
    return new Promise((resolve: any, reject: any) => {
      login(username, userInfo.password).then((data: any) => {
        setToken(data.token);
        resolve();
      }).catch((res: any) => reject(res));
    });
    // const { data } = await login(username, userInfo.password);
    // console.log(data);
    // setToken(data.token);
    // return data.token;
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
    return new Promise((resolve: any, reject: any) => {
      getInfo(token).then((data: any) => {
        if (data.roles && data.roles.length > 0) {
          resolve({
            roles: data.roles,
            name: data.name,
            avatar: data.avatar,
          });
        } else {
          throw Error('GetInfo: roles must be a non-null array!');
        }
      }).catch((err: any) => reject(err));
    });
    // const { data } = await getInfo(token);
    // if (data.roles && data.roles.length > 0) {
    //   return {
    //     roles: data.roles,
    //     name: data.name,
    //     avatar: data.avatar,
    //   };
    // } else {
    //   throw Error('GetInfo: roles must be a non-null array!');
    // }
  }

  @MutationAction({ mutate: [ 'token', 'roles' ] })
  public async LogOut() {
    if (getToken() === undefined) {
      throw Error('LogOut: token is undefined!');
    }
    removeToken();
    return new Promise((resolve: any, reject: any) => {
      logout().then(() => {
        resolve({
          token: '',
          roles: [],
        });
      }).catch((err: any) => reject(err));
    });
    // await logout();
    // removeToken();
    // return {
    //   token: '',
    //   roles: [],
    // };
  }
}

export const UserModule = getModule(User.prototype);
