import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import App from './app.vue'
import createStore from './store/store'
import createRouter from './config/route'
import './assets/styles/global.styl'

Vue.use(VueRouter)
Vue.use(Vuex)
