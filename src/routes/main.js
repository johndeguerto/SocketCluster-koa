const Router = require('koa-router')

const router = new Router()

router.get('/', async(ctx,next) => {
    console.log(ctx.request.headers)
    ctx.status = 200
    ctx.body = "Welcome to KOA with SocketCluster"
})

module.exports = router