var socketCluster = require('socketcluster-client');
var path = require('path');

var options = {
    path: '/socketcluster/',
    port: 8000,
    hostname: '127.0.0.1',
    autoConnect: true,
    secure: false,
    rejectUnauthorized: false,
    connectTimeout: 10000, //milliseconds
    ackTimeout: 10000, //milliseconds
    channelPrefix: null,
    disconnectOnUnload: true,
    multiplex: true,
    autoReconnectOptions: {
      initialDelay: 10000, //milliseconds
      randomness: 10000, //milliseconds
      multiplier: 1.5, //decimal
      maxDelay: 60000 //milliseconds
    },
    authEngine: null,
    codecEngine: null,
    subscriptionRetryOptions: {},
    query: {
      yourparam: 'hello'
    }
  };

const socket = socketCluster.create(options)

socket.on('connect', function () {
    console.log('CONNECTED');
});

// Listen to an event called 'rand' from the server
socket.on('rand', function (num) {
console.log('RANDOM: ' + num);
var curHTML = document.body.innerHTML;
curHTML += 'RANDOM: ' + num + '<br />';
document.body.innerHTML = curHTML;
});

socket.on('subscribe', function(channelname) {
console.log('subscribe:' + channelname);
});

socket.on('subscribeFail', function(channelname) {
console.log('subscribeFail:' + channelname);
});

socket.on('unsubscribe', function(channelname) {
console.log('unsubscribe:' + channelname);
});

socket.on('subscribeStateChange', function(data) {
console.log('subscribeStateChange:' + JSON.stringify(data));
});

socket.on('message', function(data) {
console.log('message:' + data);
});
