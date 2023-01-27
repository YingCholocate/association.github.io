/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-require-imports */
// 使用插件覆盖webpack配置
const { override,addWebpackAlias, overrideDevServer,addWebpackPlugin, removeModuleScopePlugin} = require('customize-cra');
// const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const mockMiddleware= require('./mock/mock-server');
const path = require('path');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

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
  })),
  removeModuleScopePlugin()

) ,
devServer:overrideDevServer(devServerConfig())
};
 

