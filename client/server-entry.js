import createApp from './create-app'

// 这里的context对应server-render.js里面的ctx
export default context => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp()

    // if (context.user) {
    //   store.state.user = context.user
    // }

    router.push(context.url)

    router.onReady(() => {
      // 获得匹配到的组件
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject(new Error('no component matched'))
      }
      // Promise.all(matchedComponents.map(Component => {
      //   if (Component.asyncData) {
      //     return Component.asyncData({
      //       route: router.currentRoute,
      //       router,
      //       store
      //     })
      //   }
      // })).then(data => {
      context.meta = app.$meta()
      //   context.state = store.state
      //   context.router = router
      resolve(app)
      // })
    })
  })
}
