const SCWorker = require('socketcluster/scworker')
, fs = require('fs')
, morgan = require('koa-morgan')
, healthChecker = require('sc-framework-health-check')
, Koa = require('koa')

// routes
const route = require('./src/routes/main')

class Worker extends SCWorker {
  run() {
    console.log('   >> Worker PID:', process.pid);

    const accessLogStream = fs.createWriteStream(__dirname + '/access.log',{ flags: 'a' })
    const app = new Koa()
    app.use(morgan('combined', { stream: accessLogStream }))
    app.use(route.routes()).use(route.allowedMethods())
    healthChecker.attach(this, route)
    this.httpServer.on('request', app.callback())

    // socket
    this.scServer.on('connection', function (socket) {

      socket.on('disconnect', function () {
        console.log('Socket disconnect', socket.id)
      });
    });
  }
}

new Worker();
