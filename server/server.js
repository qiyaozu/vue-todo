const Koa = require('koa')
const koaBody = require('koa-body')
const koaSession = require('koa-session')
const send = require('koa-send')
const path = require('path')
const app = new Koa()
const isDev = process.env.NODE_ENV === 'development'
const createDB = require('./db/db')
const apiConfig = require('../api.config')
const db = createDB(apiConfig.db.appId, apiConfig.db.appKey)

const staticRouter = require('./routers/static')
const apiRouter = require('./routers/api')
const userRouter = require('./routers/user')

let pageRouters
if (isDev) {
  pageRouters = require('./routers/dev-ssr')
} else {
  pageRouters = require('./routers/ssr')
}
// https://github.com/koajs/session 可以理解为浏览器的cookie
app.keys = ['vue ssr']
app.use(koaSession({
  key: 'v-ssr-id',
  maxAge: 3 * 60 * 1000 // 过期时间是24小时
}, app))

app.use(async (ctx, next) => {
  try {
    console.log(`request path: ${ctx.path}`)
    await next()
  } catch (err) {
    console.log(err)
    if (isDev) {
      ctx.body = err.message
    } else {
      ctx.body = 'place try again later'
    }
  }
})
app.use(async (ctx, next) => {
  ctx.db = db
  await next()
})
app.use(koaBody())
// 这里要在pageRouter之前使用
app.use(staticRouter.routes()).use(staticRouter.allowedMethods())
app.use(userRouter.routes()).use(userRouter.allowedMethods())
app.use(apiRouter.routes()).use(apiRouter.allowedMethods())

app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.ico', { root: path.join(__dirname, '../') })
  } else {
    await next()
  }
})

// koa的固定用法
app.use(pageRouters.routes()).use(pageRouters.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333
app.listen(PORT, HOST, () => {
  console.log(`sever is linstening on ${HOST}:${PORT}`)
})
