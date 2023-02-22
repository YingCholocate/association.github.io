// 使用插件覆盖webpack配置
const { override,addWebpackAlias, overrideDevServer,addWebpackPlugin, removeModuleScopePlugin,addBundleVisualizer} = require('customize-cra');
const mockMiddleware= require('./mock/mock-server');
const path = require('path');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const chalk = require('chalk');
// 查看编译速度
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const glob = require('glob')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {PurgeCSSPlugin} = require('purgecss-webpack-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const addCustomize = () => config => {
  if (process.env.NODE_ENV === 'production') {
    config.devtool = false; // 去掉map文件
    
    config.optimization.minimizer=[
     // 压缩js体积
      new TerserPlugin({
      parallel: 4,
      terserOptions: {
        parse: {
          ecma: 8,
        },
        compress: {
          ecma: 5,
          warnings: false,
          comparisons: false,
          inline: 2,
        },
        mangle: {
          safari10: true,
        },
        output: {
          ecma: 5,
          comments: false,
          ascii_only: true,
        },
      },
    }),
  // 压缩css体积
  new CssMinimizerPlugin({
    parallel: 4,
  })]
 
    if (config.entry && config.entry instanceof Array) {
      config.entry = {
        main: config.entry,
        vendor: ["react", "react-dom", "react-router-dom", "react-redux", "redux", 'react-router-config',
          "lodash", "moment", 'react-intl', 'react-addons-pure-render-mixin', 'redux-promise-middleware', "react-router", 
        ]
      };
    } else if (config.entry && typeof config.entry === 'object') {
      config.entry.vendor = ["react", "react-dom", "react-router-dom", "react-redux", "redux", 'react-router-config', 
         "lodash", "moment", 'react-intl', 'react-addons-pure-render-mixin', 'redux-promise-middleware', "react-router", 
      ];
    }

   //  最小化entry chunk
   config.optimization.runtimeChunk=true;
   //  代码分离 
    config.optimization.splitChunks= {
     // include all types of chunks
     chunks: 'all',
     // 重复打包问题
     cacheGroups:{
       vendors:{ // node_modules里的代码
         test: /[\\/]node_modules[\\/]/,
         chunks: "all",
         // name: 'vendors', 一定不要定义固定的name
         priority: 10, // 优先级
         enforce: true 
       }
     }
   };
  }
  return config;
};
 
const devServerConfig=()=>configs=>{
  return {
    ...configs,
    proxy:{
      "/association":{
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    setupMiddlewares:(middlewares, devServer)=>{
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }
      mockMiddleware(devServer.app);
     
      return middlewares;
    }
  };
};
module.exports = {
  webpack:override(
  addWebpackAlias({
    "@": path.resolve(__dirname, './src')
  }),
  addWebpackPlugin(new ESLintWebpackPlugin({
    emitWarning: false, // new
    failOnWarning: false, // new
  }),
  // 编译进度条
  process.env.NODE_ENV === 'production'&& new ProgressBarPlugin({
    format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`
  }),
   // 提取 CSS
   process.env.NODE_ENV === 'production'&& new MiniCssExtractPlugin({
    filename: "[name].css",
  }),
  // CSS Tree Shaking
  process.env.NODE_ENV === 'production'&& new PurgeCSSPlugin({
    paths: glob.sync(`${path.appSrc}/**/*`,  { nodir: true }),
  }),
  ),
  process.env.NODE_ENV === 'production'&& addBundleVisualizer(),
  removeModuleScopePlugin(),
  process.env.NODE_ENV === 'production'&& addCustomize()
) ,
devServer:overrideDevServer(devServerConfig())
};
 

