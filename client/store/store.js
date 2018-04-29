import Vuex from 'vuex'
import state from './state.js'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

export default () => { // 这种方式不会在服务端产生内存溢出
  const store = new Vuex.Store({
    strict: true, // 没有通过commit修改数据的话，会报错
    state,
    mutations,
    getters,
    actions
    // modules: {
    //   a: {
    //     state: {
    //       text: 'a-module'
    //     }
    //   },
    //   b: {
    //     state: {
    //       text: 'b-module'
    //     }
    //   }
    // }
  })
  if (module.hot) {
    module.hot.accept([
      './state',
      './/mutations',
      './actions',
      './/getters'
    ], () => {
      const newState = require('./state').default
      const newMutations = require('./mutations').default
      const newActions = require('./actions').default
      const newGetters = require('./getters').default

      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newGetters,
        actions: newActions
      })
    })
  }

  return store
}
