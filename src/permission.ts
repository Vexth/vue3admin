import router from './router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Message } from 'element-ui';
import { getToken } from '@/utils/auth';
import { Route } from 'vue-router';
import { UserModule } from '@/store/modules/user';

import { RoutersModule } from '@/store/modules/routers';

import Layout from '@/views/layout/Layout.vue';
import { IMPORT_VIEWS } from './router/_import';

const whiteList = ['/login'];

function filterAsyncRouter(asyncRouterMap: any[]): any[] { // 遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = asyncRouterMap.filter((route: any) => {
    if (route.component) {
      if (route.component === 'Layout') { // Layout组件特殊处理
        route.component = Layout;
      } else {
        route.component = IMPORT_VIEWS(route.component);
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children);
    }
    return true;
  });

  return accessedRouters;
}

router.beforeEach((to: Route, from: Route, next: any) => {
  NProgress.start();
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done();
    } else {
      if (UserModule.roles.length === 0) {
        UserModule.GetInfo().then(async () => {
          // next();
          await RoutersModule.Router();
          const r: any = await RoutersModule.routerViews;
          const getRouter = filterAsyncRouter(r); // 过滤路由
          router.addRoutes(getRouter); // 动态添加路由
          RoutersModule.addRouters(getRouter); // 将路由数据传递给全局变量，做侧边栏菜单渲染工作
          next({ ...to, replace: true });
        }).catch((err: any) => {
          UserModule.FedLogOut().then(() => {
            Message.error(err || 'Verification failed, please login again');
            next({ path: '/' });
          });
        });
      } else {
        next();
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`); // 否则全部重定向到登录页
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
