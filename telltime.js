
//comment all tessel stuff if you want to test locally
var tessel = require('tessel');

var gpio = tessel.port['GPIO']; // select the GPIO port
var myPin = gpio.pin['G6'];


//uncomment this if you want to test locally.
// myPin = {
// 	output: function(val){
// 		console.log('set to: '+val);
// 	}
// }

myPin.output(1);
console.log('Fired one output');


var add10 = function(inputDate){
	var mins = inputDate.getMinutes(),
			hours = inputDate.getHours();

	mins = mins + 1;

	if(mins >= 59){
		hours++;
		mins = 0;
	}

	var outputDate = new Date(inputDate.toString());
	outputDate.setHours(hours);
	outputDate.setMinutes(mins);
	return outputDate;
}

var now = new Date();
console.log('Sleeping at: '+ now.toTimeString());
var wakey = add10(now);
console.log('Wake up at: ' + wakey.toTimeString())
var alarm = false;
while(!alarm){
	var currentTime = (new Date()).toString();
	if(currentTime === wakey.toString()){
		alarm = true;
		console.log('alarm rang!');
	}
}

if(alarm){
	myPin.output(1);
}