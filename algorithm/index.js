//this function calculates the 90 minute cycle from input time and returns a new date object
var add90 = function(inputDate){
	var mins = inputDate.getMinutes(),
			hours = inputDate.getHours();

	mins = mins + 10;

	if (mins > 59) {
		mins = mins-59;
		hours++;
	}

	var outputDate = new Date(inputDate.toDateString());
	outputDate.setHours(hours);
	outputDate.setMinutes(mins);
	return outputDate;
}

exports.getWakeUpTimes = function(){

var now = new Date(),
		last;

//var d = new Date(year, month, day, hours, minutes, seconds, milliseconds);
var output = [];

//this loops through the number of cycles.
for(var i = 0; i<5; i++){
	var shiftedDate = add90(last || now);
	delete last;
	last = shiftedDate;
	if(i>1){
		output[i-2] = shiftedDate;
	}
}

	return output;

}