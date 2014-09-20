var wifi = require('wifi-cc3000');
var network = 'HackTheNorth';
var pass = 'uwaterloo'
var security = 'wpa2';

function tryConnect(){
  if (!wifi.isBusy()) {
    connect();
  } else {
    console.log("is busy, trying again");
    setTimeout(function(){
      tryConnect();
    }, 1000);
  }
}

function connect(){
  wifi.connect({
    security: security
    , ssid: network
    , password: pass
    , timeout: 30
  });
}

wifi.on('connect', function(err, data){
  console.log("connect emitted", err, data);
});

wifi.on('disconnect', function(err, data){
  console.log("disconnect emitted", err, data);
})

wifi.on('timeout', function(err){
  console.log("timeout emitted");
  connect();
});

wifi.on('error', function(err){
  console.log("error emitted", err);
});