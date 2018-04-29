const Koa = require('koa')

const app = new Koa()

const isDev = process.env.NODE_ENV === 'development'

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

app.listen(3333)
