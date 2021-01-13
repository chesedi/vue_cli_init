// VERSION
const PKG_VERSION = process.env.npm_package_version;
const PKG_QA_VERSION = process.env.npm_package_qaVersion;
process.env.VUE_APP_VERSION = process.env.NODE_ENV === "development" ? `${PKG_VERSION}.${PKG_QA_VERSION}` :  `${PKG_VERSION}`

// require
// const webpack = require("webpack")
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

// vue.config.js
module.exports = {
  // options...
  // publicPath
  // publicPath: process.env.NODE_ENV === 'production'
  // ? '/production-sub-path/'
  // : '/',

  // lintOnSave
  // lintOnSave: process.env.NODE_ENV !== 'production'

  // transpileDependencies
  // node_modules 안에 module을 babeling 하고 싶을때 사용

  // chainWebpack
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = process.env.VUE_APP_TITLE;
        args[0].version = process.env.VUE_APP_VERSION;
        return args
      })
  },
  // config.module
  //   .rule('vue')
  //   .use('vue-loader')
  //     .tap(options => {
  //       // modify the options...
  //       return options
  //     })

  // configureWebpack
  configureWebpack: {
    // output: {
      // filename:  `main.${process.env.VUE_APP_VERSION}.js`,
      // chunkFilename: '[name].js',
    // }
    plugins: [
      new CopyWebpackPlugin([
        {
          from: path.join(__dirname, "src/assets/css/style.css"),
          to: path.join(__dirname, "dist/assets/css/style." + process.env.VUE_APP_VERSION + ".css"),
          transform: function (content, path) {
            var convert = content.toString().replace(/sprite\.png/gim, 'sprite.' + process.env.VUE_APP_VERSION + '.png')
              .replace(/sprite@2x\.png/gim, 'sprite@2x.' + process.env.VUE_APP_VERSION + '.png')
              .replace(/sprite-m\.png/gim, 'sprite-m.' + process.env.VUE_APP_VERSION + '.png')
              .replace(/sprite@2x-m\.png/gim, 'sprite@2x-m.' + process.env.VUE_APP_VERSION + '.png');
            return Buffer.from(convert);
          }
        },
        {
          from: path.join(__dirname, "src/assets/css/popup.css"),
          to: path.join(__dirname, "dist/assets/css/popup." + process.env.VUE_APP_VERSION + ".css"),
          transform: function (content, path) {
            var convert = content.toString().replace(/sprite\.png/gim, 'sprite.' + process.env.VUE_APP_VERSION + '.png')
              .replace(/sprite@2x\.png/gim, 'sprite@2x.' + process.env.VUE_APP_VERSION + '.png')
              .replace(/sprite-m\.png/gim, 'sprite-m.' + process.env.VUE_APP_VERSION + '.png')
              .replace(/sprite@2x-m\.png/gim, 'sprite@2x-m.' + process.env.VUE_APP_VERSION + '.png');
            return Buffer.from(convert);
          }
        },
        {
          from: path.join(__dirname, "src/assets/css/"),
          to: path.join(__dirname, "dist/assets/css/"),
        },
        {
          from: path.join(__dirname, "src/assets/fonts/"),
          to: path.join(__dirname, "dist/assets/fonts/"),
        },
        {
          from: path.join(__dirname, "src/assets/images/"),
          to: path.join(__dirname, "dist/assets/images/"),
        },
      ]),
    ]
  },


  // css.requireModuleExtension
  // module.css 파일명에서 module을 삭제하고 싶을때
  css: {
    extract: {
      // filename: `main.${process.env.VUE_APP_VERSION}.css`,
      // filename: '[name].css',
      // chunkFilename: '[name].css',
    },
    loaderOptions: {
      // sass: {
      //   data: `
      //     @import "@/assets/css/scss/_base.scss";
      //   `
      // }
    }
  },

  // devServer
  devServer: {
    port: process.env.VUE_APP_PORT || 3000,
    // proxy: {
    //   '/api': {
    //     target: 'https://dev-pass.etoos.com',
    //     changeOrigin: true
    //   },
    // }
  }

  // pluginOptions
  // pluginOptions: {
  //   foo: {
  //     // plugins can access these options as
  //     // `options.pluginOptions.foo`.
  //   }
  // }

}