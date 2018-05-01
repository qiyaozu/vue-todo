const Router = require('koa-router')
const path = require('path')
const axios = require('axios')
const fs = require('fs')
const MemoryFS = require('memory-fs')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')
const serverRender = require('./server-render')

const serverConfig = require('../../build/webpack.config.server')

// webpacks编译的代码直接放在内存中、
const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFS()
serverCompiler.outputFileSystem = mfs

let bundle
// client目录改了哪个文件，都会重新执行打包、
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  // 在node环境下输出警告和错误
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.warn(err))

  const bundlePath = path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json' // VueServerPlugin默认生成的目录
  )
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8')) // 从内存中以utf-8读取bundle
  console.log('new bundle generated')
})

const router = new Router()
router.get('*', async (ctx) => {
  if (!bundle) {
    ctx.body = '你等一会，别着急......'
    return
  }

  const clientManifestResp = await axios.get(
    'http://127.0.0.1:8000/public/vue-ssr-client-manifest.json'
  )
  const clientManifest = clientManifestResp.data

  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs'),
    'utf-8'
  )

  const renderer = VueServerRenderer
    .createBundleRenderer(bundle, {
      inject: false,
      clientManifest
    })

  await serverRender(ctx, renderer, template)
})

module.exports = router
