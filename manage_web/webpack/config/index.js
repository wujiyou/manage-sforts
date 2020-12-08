'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    
    // proxyTable: {

    //   // 代理规则
    // '/zhou': { // 配置的url请求名字开头
    //   // 代理的目标服务器地址,这个路径是我代理到服务器,即你要请求的第三方接口
    //   target: 'http://192.168.0.13:8081',
    //   // https请求需要该设置
    //   secure: false,
    //   // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，
    //   //并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
    //   // 必须设置该项
    //   changeOrigin: true,
    //   // 将 '/api' 替换成 ''
    //   // 重写路径运行后就代理到对应的地址
    //   pathRewrite: { "^/zhou": "" }
    // },
    // '/bing': { // 配置的url请求名字开头
    //   // 代理的目标服务器地址,这个路径是我代理到服务器,即你要请求的第三方接口
    //   target: 'http://192.168.0.105:8011',
    //   // https请求需要该设置
    //   secure: false,
    //   // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，
    //   //并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
    //   // 必须设置该项
    //   changeOrigin: true,
    //   // 将 '/api' 替换成 ''
    //   // 重写路径运行后就代理到对应的地址
    //   pathRewrite: { "^/bing": "" }
    // },
    // '/hai': { // 配置的url请求名字开头
    //   // 代理的目标服务器地址,这个路径是我代理到服务器,即你要请求的第三方接口
    //   target: 'http://192.168.0.105:8081',
    //   // https请求需要该设置
    //   secure: false,
    //   // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，
    //   //并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
    //   // 必须设置该项
    //   changeOrigin: true,
    //   // 将 '/api' 替换成 ''
    //   // 重写路径运行后就代理到对应的地址
    //   pathRewrite: { "^/hai": "" }
    // },
    // '/ma': { // 配置的url请求名字开头
    //   // 代理的目标服务器地址,这个路径是我代理到服务器,即你要请求的第三方接口
    //   target: 'http://192.168.0.104:8081',
    //   // https请求需要该设置
    //   secure: false,
    //   // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，
    //   //并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
    //   // 必须设置该项
    //   changeOrigin: true,
    //   // 将 '/api' 替换成 ''
    //   // 重写路径运行后就代理到对应的地址
    //   pathRewrite: { "^/ma": "" }
    // },
    // '/api': { // 配置的url请求名字开头
    //   // 代理的目标服务器地址,这个路径是我代理到服务器,即你要请求的第三方接口
    //   target: 'http://192.168.0.8:8081',
    //   // https请求需要该设置
    //   secure: false,
    //   // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，
    //   //并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
    //   // 必须设置该项
    //   changeOrigin: true,
    //   // 将 '/api' 替换成 ''
    //   // 重写路径运行后就代理到对应的地址
    //   pathRewrite: { "^/api": "" }
    // },
    // '/tang': { 
    //   // 配置的url请求名字开头
    //   // 代理的目标服务器地址,这个路径是我代理到服务器,即你要请求的第三方接口
    //   target: 'http://192.168.0.16:8081',
    //   // https请求需要该设置
    //   secure: false,
    //   // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，
    //   //并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
    //   // 必须设置该项
    //   changeOrigin: true,
    //   // 将 '/api' 替换成 ''
    //   // 重写路径运行后就代理到对应的地址
    //   pathRewrite: { "^/tang": "" }
    // },
    // '/liu': { // 配置的url请求名字开头
    //   // 代理的目标服务器地址,这个路径是我代理到服务器,即你要请求的第三方接口
    //   target: 'http://192.168.0.113:8081',
    //   // https请求需要该设置
    //   secure: false,
    //   // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，
    //   //并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
    //   // 必须设置该项
    //   changeOrigin: true,
    //   // 将 '/api' 替换成 ''
    //   // 重写路径运行后就代理到对应的地址
    //   pathRewrite: { "^/liu": "" }
    // },

    // },

    // Various Dev Server settings
    
    
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 9000, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}