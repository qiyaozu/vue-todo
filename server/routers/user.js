const Router = require('koa-router')

const userRouter = new Router({ prefix: '/user' })

userRouter.post('/login', async ctx => {
  const user = ctx.request.body
  if (user.username === 'burgess' && user.password === '000000') {
    ctx.session.user = {
      username: 'burgess'
    }
    ctx.body = {
      success: true,
      data: {
        username: 'burgess'
      }
    }
  } else {
    ctx.status = 400
    ctx.body = {
      success: false,
      message: 'username or password error'
    }
  }
})

module.exports = userRouter
