module.exports = {
  // outputDir: process.env.outputDir,
  // assetsDir: 'static',
  devServer: {
    open: false,
    host: 'localhost',
    port: 3100,
    https: false,
    hotOnly: false,
    proxy: {
      '/': {
        ws: false,
        target: 'https://xxx.com/',// 设置你调用的接口域名和端口号 别忘了加http, 比如：http://40.00.100.100:3002/
        changeOrigin: true,
        pathRewrite: {
          '^/': ''// 这里理解成用‘/’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/user/add’即可
        }
      },
    }
  },
  productionSourceMap: false,
  // chainWebpack: config => {
  //   config.module
  //     .rule('svg')
  //     .uses.clear()
  //   config.module
  //     .rule('svg1')
  //     .test(/\.svg$/)
  //     .use('svg-sprite')
  //     .loader('svg-sprite-loader')
  //     .options({
  //       symbolId: 'icon-[name]'
  //     })
  //     .end()
  //     .include
  //     .add(resolve('src/icons'))
  //     .end()
  // },
}
