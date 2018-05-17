// mutations如果要传多个参数的话，要通过对象的形式传过去
export default {
  updateCount (state, num) {
    state.count = num
  },
  fillTodos (state, data) {
    state.todos = data
  },
  doLogin (state, userInfo) {
    state.userInfo = userInfo
  },
  updateTodo (state, obj) {
    state.todos.splice(
      state.todos.findIndex(t => t.id === obj.id),
      1,
      obj.data
    )
  },
  addTodo (state, data) {
    state.todos.push(data)
  },
  deleteTodo (state, id) {
    state.todos = state.todos.forEach(item => item.id !== id)
  }
}
