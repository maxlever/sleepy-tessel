
//comment all tessel stuff if you want to test locally
var tessel = require('tessel');

var gpio = tessel.port['GPIO']; // select the GPIO port
var led = gpio.pin['G5'];


// var f = 2000;
// while(f>1000){
// 	gpio.pwmFrequency(f);
// 	gpio.pin['G5'].pwmDutyCycle(0.5);
// 	gpio.pin['G5'].output(1);
// 	f--;
// }
var buzzer = gpio.pin['G5'];

// setInterval(function(){
// 	console.log(buzzer.read());
// }, 3000)

//uncomment this if you want to test locally.
// myPin = {
// 	output: function(val){
// 		console.log('set to: '+val);
// 	}
// }

buzzer.output(1);
led.output(1);
led.output(0);
gpio.digital[1].write(1);
gpio.digital[1].write(0);

console.log('Fired one output');


var http = require('http');

var statusCode = 200;
var alarm = false;
var json;
buzzer.output(0);

setInterval(function start () {
	console.log('immediate started');
  http.get('http://10.20.85.89:9929/api/wake', function (res) {
    console.log('http get initiated');
    var bufs = [];
    res.on('data', function (data) {
      bufs.push(new Buffer(data));
      json = JSON.parse((new Buffer(data)).toString());
      console.log(json);
    });

    res.on('end', function () {
    	console.log('http get resolved')
    	if(json.ringing){
    		alarm = true;
    	}else{
    		buzzer.output(0);
				led.output(0);
				gpio.digital[1].write(0);
    		alarm = false;
    	}
    	console.log('alarm:'+alarm);
    	 	// setImmediate(start);
    });

  }).on('error', function (e) {
    // setImmediate(start);
    console.log(e);
  });
}, 5000);

var rmint;
setInterval(function(){
	if(alarm){
		console.log('alarm rang');
		
		rmint = setInterval(function(){
			gpio.pwmFrequency(2000);
			buzzer.pwmDutyCycle(0.5);
		}, 2000);

				led.output(1);
				gpio.digital[1].write(1);
	}else{
		if(rmint){clearInterval(rmint)};
		console.log('alarm did not ring');
				buzzer.output(0);
				led.output(0);
				gpio.digital[1].write(0);
	}
}, 6000);


//crappy code
// var add10 = function(inputDate){
// 	var mins = inputDate.getMinutes(),
// 			hours = inputDate.getHours();

// 	mins = mins + 1;

// 	if(mins >= 59){
// 		hours++;
// 		mins = 0;
// 	}

// 	var outputDate = new Date(inputDate.toString());
// 	outputDate.setHours(hours);
// 	outputDate.setMinutes(mins);
// 	return outputDate;
// }

// var now = new Date();
// console.log('Sleeping at: '+ now.toTimeString());
// var wakey = add10(now);
// console.log('Wake up at: ' + wakey.toTimeString())
// var alarm = false;
// while(!alarm){
// 	var currentTime = (new Date()).toString();
// 	if(currentTime === wakey.toString()){
// 		alarm = true;
// 		console.log('alarm rang!');
// 	}
// }

// if(alarm){
// 	myPin.output(1);
// }