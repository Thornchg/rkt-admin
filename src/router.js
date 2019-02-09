// import Vue from 'vue'
// import Router from 'vue-router'
// import Home from './views/Home.vue'
import Home from './components/app/app-frame'

Vue.use(VueRouter);

let vueRouter= new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          name: 'home',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './pages/index.vue'),
          meta: {title: '首页'}
        },{
          path: 'tableBasic',
          name: 'tableBasic',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './pages/table/basic.vue'),
          meta: {title: '首页'}
        },{
          path: 'tableSearch',
          name: 'tableSearch',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './pages/table/search.vue'),
          meta: {title: '首页'}
        }, {
          path: 'form',
          name: 'form',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './pages/form.vue'),
          meta: {title: '首页'}
        }, {
          path: 'questionInfo',
          name: 'questionInfo',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './pages/question/question-info.vue'),
          meta: {title: '题库信息'}
        }, {
          path: 'addChoice',
          name: 'addChoice',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './pages/question/add-choice.vue'),
          meta: {title: '添加综合知识题'}
        }, {
          path: 'addCase',
          name: 'addCase',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './pages/question/add-case.vue'),
          meta: {title: '添加案例题'}
        }, {
          path: 'addThesis',
          name: 'addThesis',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './pages/question/add-thesis.vue'),
          meta:{title:'添加论文题'}
        }, {
          path: 'systemError',
          name: 'systemError',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './pages/500.vue'),
          meta: {title: '系统错误'}
        }, {
          path: 'permissionError',
          name: 'permissionError',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './pages/403.vue'),
          meta: {title: '权限错误'}
        }, {
          path: 'accountBasic',
          name: 'accountBasic',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './pages/account/account.vue')
        }, {
          path: 'securitySetting',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './pages/account/account-setting.vue'),
          children: [
            {
              path: '',
              name: 'securitySetting',
              component: () => import('./pages/account/modules/security-setting.vue'),
            },{
              path: 'noticeSetting',
              name: 'noticeSetting',
              component: () => import('./pages/account/modules/notice-setting.vue'),
            }
          ]

        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      meta: {title: '关于'}
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue'),
    },
    {
      path: '/notfoundError',
      name: 'notfoundError',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/404.vue'),
      meta: {title: '页面找不到'}
    },

  ]
});
vueRouter.beforeEach((to, from, next) => {
  HeyUI.$LoadingBar.start();
  if (to.meta && to.meta.title) {
    document.title = to.meta.title + ' - 管理应用';
  } else {
    document.title = '管理系统';
  }
  next();
});
vueRouter.afterEach(() => {
  HeyUI.$LoadingBar.success();
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
});

export default vueRouter;
