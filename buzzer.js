var tessel = require('tessel'); // import tessel
var gpio = tessel.port['GPIO']; // select the GPIO port
var GPIOgnd = gpio.digital[1];
var GPIOv = gpio.digital[3];
(function blink (value) {
  GPIOv.write(value);
  setTimeout(blink, 200, !value);
})(true)
