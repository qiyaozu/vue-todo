const Router = require('koa-router')
const send = require('koa-send')
// 只会处理\/public开头的路径，处理静态文件资源的中间件
const staticRouter = new Router({ prefix: '/public' })

staticRouter.get('/*', async ctx => {
  await send(ctx, ctx.path)
})

module.exports = staticRouter
