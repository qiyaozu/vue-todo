// 异步的修改数据要放在actions里面
import model from '../model/client-model'
import bus from '../util/bus'
const handleError = (err) => {
  // handle error
  if (err.code === 401) {
    // TODO notification组件的使用
    console.error('you need login')
    bus.$emit('auth')
  }
}
export default {
  updateAsync (store, data) {
    setTimeout(() => {
      store.commit('updateCount', data.num)
    }, data.time)
  },
  fetchTodos ({ commit }) {
    return model.getTodos()
      .then(data => {
        commit('fillTodos', data)
      })
      .catch(err => {
        handleError(err)
      })
  },
  login ({ commit }, { username, password }) {
    return new Promise((resolve, reject) => {
      model.login(username, password)
        .then(data => {
          commit('doLogin', data)
          resolve()
        }).catch(err => {
          handleError(err)
          reject(err)
        })
    })
  },
  addTodo ({ commit }, data) {
    return model.createTodo(data)
      .then(_data => {
        commit('addTodo', data)
      })
  },
  updateTodo ({ commit }, { id, data }) {
    return model.updateTodo(id, data)
      .then(data => {
        commit('updateTodo', {id, data})
      })
  },
  deleteTodo ({ commit }, id) {
    return model.deleteTodo(id)
      .then(data => {
        commit('deleteTodo', id)
      })
  }
}
