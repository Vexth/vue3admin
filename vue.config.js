module.exports = {
  // outputDir: process.env.outputDir,
  // assetsDir: 'static',
  devServer: {
    open: false,
    host: 'localhost',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      '/': {
        ws: false,
        target: 'https://appdev.yqsqpt.com/',//设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true,
        pathRewrite: {
          '^/': ''//这里理解成用‘/’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/user/add’即可
        }
      },
    }
  }
}
