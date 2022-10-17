// 反向代理处理跨域问题
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        //修改
        '/association',
        createProxyMiddleware({
            //修改target
            target: "http://localhost:8080",
            changeOrigin: true,
        })
    )
    app.use(
        //修改
        '/xsgrkbcx!getKbRq.action',
        createProxyMiddleware({
            //修改target
            target: "https://jxfw.gdut.edu.cn",
            changeOrigin: true,
        })
    )
}