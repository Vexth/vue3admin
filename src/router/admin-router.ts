
import Layout from '@/views/layout/Layout.vue';

const AdminRouter = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/404',
    component: () => import('@/views/404.vue'),
  },
  {
    path: '/',
    component: Layout,
    redirect: 'dashboard',
    name: 'dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'table' },
        component: () => import('@/views/dashboard/index.vue'),
      },
    ],
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: '/table',
        name: 'Table',
        component: () => import('@/views/table/index.vue'),
        meta: { title: 'Table', icon: 'table' },
      },
      {
        path: '/tree',
        name: 'Tree',
        component: () => import('@/views/tree/index.vue'),
        meta: { title: 'Tree', icon: 'tree' },
      },
    ],
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: '/index',
        name: 'Form',
        component: () => import('@/views/form/index.vue'),
        meta: { title: 'Form', icon: 'form' },
      },
    ],
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: { title: 'Nested', icon: 'nested' },
    children: [
      {
        path: '/menu1',
        component: () => import('@/views/nested/menu1/index.vue'),
        name: 'Menu1',
        meta: { title: 'menu1' },
        children: [
          {
            path: '/menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1/index.vue'),
            name: 'Menu1-1',
            meta: { title: 'menu1-1' },
          },
          {
            path: '/menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2/index.vue'),
            name: 'Menu1-2',
            meta: { title: 'menu1-2' },
            children: [
              {
                path: '/menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1/index.vue'),
                name: 'Menu1-2-1',
                meta: { title: 'menu1-2-1' },
              },
              {
                path: '/menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2/index.vue'),
                name: 'Menu1-2-2',
                meta: { title: 'menu1-2-2' },
              },
            ],
          },
          {
            path: '/menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3/index.vue'),
            name: 'Menu1-3',
            meta: { title: 'menu1-3' },
          },
        ],
      },
      {
        path: '/menu2',
        component: () => import('@/views/nested/menu2/index.vue'),
        name: 'Menu2',
        meta: { title: 'menu2' },
      },
    ],
  },
  {
    path: 'tinymce',
    component: Layout,
    children: [
      {
        path: '/tinymce',
        name: 'Tinymce',
        component: () => import('@/views/tinymce/index.vue'),
        meta: { title: 'Tinymce', icon: 'link' },
      },
    ],
  },
  {
    path: '*',
    redirect: '/404',
  },
];

export default AdminRouter;
