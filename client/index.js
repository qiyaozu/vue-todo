import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'
import createRouter from './config/route'
import './assets/styles/global.styl'

Vue.use(VueRouter)

const router = createRouter()

new Vue({
  router,
  render: h => h(App)
}).$mount('#root')
