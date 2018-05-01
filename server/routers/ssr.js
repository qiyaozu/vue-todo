const Router = require('koa-router')
const path = require('path')
const fs = require('fs')
const VueServerRender = require('vue-server-renderer')
const serverRender = require('./server-render')
const clientManifest = require('../../public/vue-ssr-client-manifest.json')
// VueServerRender会根据vue-ssr-server-bundle自动处理好页面之间的关系
const renderer = VueServerRender.createBundleRenderer(
  path.join(__dirname, '../../server-build/vue-ssr-server-bundle.json'),
  {
    inject: false, // 不自动注入
    clientManifest // 依赖clientManifest
  }
)
const template = fs.readFileSync(
  path.join(__dirname, '../server.template.ejs'),
  'utf-8'
)
const pageRouter = new Router()
pageRouter.get('*', async (ctx) => {
  await serverRender(ctx, renderer, template)
})

module.exports = pageRouter
