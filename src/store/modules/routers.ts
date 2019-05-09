import { VuexModule, Module, Mutation, MutationAction, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';

import { adminrouter } from '@/api/login';

export interface IRoutersState {
  routerViews: any[];
  routers: any[];
}

@Module({ dynamic: true, store, name: 'routers' })
class Routers extends VuexModule implements IRoutersState {
  public routerViews: any = [];
  public routers: any = [];

  get RouterViews(): any[] {
    return this.routerViews;
  }

  get Routers(): any[] {
    return this.routers;
  }

  @Mutation
  public ADD_ROUTER_VIEW(view: any) {
    this.routerViews = view;
  }
  @Mutation
  public ADD_ROUTERS(view: any) {
    this.routers = view;
  }
  @Action({ commit: 'ADD_ROUTER_VIEW' })
  public addRouterView(view: any) {
    return view;
  }
  @Action({ commit: 'ADD_ROUTERS' })
  public addRouters(view: any) {
    return view;
  }
  @MutationAction({ mutate: [ 'routerViews' ] })
  public async Router() {
    const data: any = await adminrouter();
    return {
      routerViews: data,
    };
  }
}

export const RoutersModule = getModule(Routers.prototype);
