module.exports = isDev => {
  return {
    // 去掉空格
    preserveWhitepace: true,
    // 把vue文件里面的css单独导出到css文件
    extractCss: !isDev,
    cssModules: {
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
      camelCase: true
    }
  }
}