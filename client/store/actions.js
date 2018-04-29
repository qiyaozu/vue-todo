// 异步的修改数据要放在actions里面
export default {
  updateAsync (store, data) {
    setTimeout(() => {
      store.commit('updateCount', data.num)
    }, data.time)
  }
}
