// 重新生成新的app
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import App from './app.vue'
import createStore from './store/store'
import createRouter from './config/route'
import './assets/styles/global.styl'
import meta from 'vue-meta'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(meta)

export default () => {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}
