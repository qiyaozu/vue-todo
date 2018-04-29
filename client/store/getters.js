// 对需要处理的数据进行统一的修改  需要用到getters 可以理解为vue的computed
export default {
  fullName (state) {
    return `${state.lastName} ${state.firstName}`
  }
}
