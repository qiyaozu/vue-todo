// https://www.npmjs.com/package/ejs   ejs使用方法

const ejs = require('ejs')
module.exports = async (ctx, renderer, template) => {
  ctx.headers['Content-type'] = 'text/html'

  const context = {url: ctx.path}

  try {
    // vue-server-render根据传进来的路径渲染相应的html
    const appString = await renderer.renderToString(context)
    const { title } = context.meta.inject()
    const html = ejs.render(template, {
      appString,
      title: title.text(),
      style: context.renderStyles(),
      scripts: context.renderScripts()
    })
    ctx.body = html
  } catch (err) {
    console.log('render error：' + err)
    throw err
  }
}
