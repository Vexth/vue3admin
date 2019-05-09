import { session } from '@/utils/sessionStorage';
import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';

export enum DeviceType {
  Mobile,
  Desktop,
}

export interface IAppState {
  device: DeviceType;
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
  };
}

@Module({ dynamic: true, store, name: 'app' })
class App extends VuexModule implements IAppState {
  public sidebar = {
    opened: session.get('sidebarStatus') !== 'closed',
    withoutAnimation: false,
  };
  public device = DeviceType.Desktop;

  get Sidebar(): any {
    return this.sidebar;
  }

  get Device(): any {
    return this.device;
  }

  @Mutation
  public TOGGLE_SIDEBAR(withoutAnimation: boolean) {
    if (this.sidebar.opened) {
      session.set('sidebarStatus', 'closed');
    } else {
      session.set('sidebarStatus', 'opened');
    }
    this.sidebar.opened = !this.sidebar.opened;
    this.sidebar.withoutAnimation = withoutAnimation;
  }
  @Mutation
  public CLOSE_SIDEBAR(withoutAnimation: boolean) {
    session.set('sidebarStatus', 'closed');
    this.sidebar.opened = false;
    this.sidebar.withoutAnimation = withoutAnimation;
  }
  @Mutation
  public TOGGLE_DEVICE(device: DeviceType) {
    this.device = device;
  }

  @Action({ commit: 'TOGGLE_SIDEBAR' })
  public ToggleSideBar(withoutAnimation: boolean) {
    return withoutAnimation;
  }
  @Action({ commit: 'CLOSE_SIDEBAR' })
  public CloseSideBar(withoutAnimation: boolean) {
    return withoutAnimation;
  }
  @Action({ commit: 'TOGGLE_DEVICE' })
  public ToggleDevice(device: DeviceType) {
    return device;
  }
}

export const AppModule = getModule(App.prototype);
