const AdminRouter = [
  {
    path: '/',
    component: 'Layout',
    redirect: 'dashboard',
    name: 'dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'table' },
        component: 'dashboard/index',
      },
    ],
  },
  {
    path: '/example',
    component: 'Layout',
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: '/table',
        name: 'Table',
        component: 'table/index',
        meta: { title: 'Table', icon: 'table' },
      },
      {
        path: '/tree',
        name: 'Tree',
        component: 'tree/index',
        meta: { title: 'Tree', icon: 'tree' },
      },
    ],
  },
  {
    path: '/form',
    component: 'Layout',
    children: [
      {
        path: '/index',
        name: 'Form',
        component: 'form/index',
        meta: { title: 'Form', icon: 'form' },
      },
    ],
  },
  {
    path: '/nested',
    component: 'Layout',
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: { title: 'Nested', icon: 'nested' },
    children: [
      {
        path: '/menu1',
        component: 'nested/menu1/index',
        name: 'Menu1',
        meta: { title: 'menu1' },
        children: [
          {
            path: '/menu1-1',
            component: 'nested/menu1/menu1-1/index',
            name: 'Menu1-1',
            meta: { title: 'menu1-1' },
          },
          {
            path: '/menu1-2',
            component: 'nested/menu1/menu1-2/index',
            name: 'Menu1-2',
            meta: { title: 'menu1-2' },
            children: [
              {
                path: '/menu1-2-1',
                component: 'nested/menu1/menu1-2/menu1-2-1/index',
                name: 'Menu1-2-1',
                meta: { title: 'menu1-2-1' },
              },
              {
                path: '/menu1-2-2',
                component: 'nested/menu1/menu1-2/menu1-2-2/index',
                name: 'Menu1-2-2',
                meta: { title: 'menu1-2-2' },
              },
            ],
          },
          {
            path: '/menu1-3',
            component: 'nested/menu1/menu1-3/index',
            name: 'Menu1-3',
            meta: { title: 'menu1-3' },
          },
        ],
      },
      {
        path: '/menu2',
        component: 'nested/menu2/index',
        name: 'Menu2',
        meta: { title: 'menu2' },
      },
    ],
  },
  {
    path: 'tinymce',
    component: 'Layout',
    children: [
      {
        path: '/tinymce',
        name: 'Tinymce',
        component: 'tinymce/index',
        meta: { title: 'Tinymce', icon: 'link' },
      },
    ],
  },
];

export default {
  router: () => AdminRouter,
}