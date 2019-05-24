/**
 * Application configuration
 */

 const os = require('os')

 module.exports = {

    APPNAME : 'socketcluster',

    PORT : process.env.PORT || 8000,

    CPUCOUNT : os.cpus().length,

    ENVIRONMENT : process.env.ENV || 'dev'

 }