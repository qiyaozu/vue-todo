
export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    component: () => import('../views/todo/todo.vue') // 动态加载组件的方式
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/test',
    component: () => import('../views/test/test.vue')
  }
]
