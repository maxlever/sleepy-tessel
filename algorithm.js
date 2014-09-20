;(function(){
var now = new Date();
console.log(now.getHours()+' '+now.getUTCMinutes()+' '+now.getUTCSeconds());

var output = [];

//var d = new Date(year, month, day, hours, minutes, seconds, milliseconds);

for(var i = 4; i<8; i++){
	if(i>4){
		output[i-5] = (new Date(now.getYear(), now.getMonth(), now.getDay(), now.getHours()+i, now.getMinutes()+i, now.getSeconds()));
	}
}

console.log(output);

})();