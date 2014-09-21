module.exports=function(app, express){
	var fs = require('fs');
	var algorithm = require('.././algorithm');
	var router = express.Router();
	var filename= 'wakey.txt';


	router.route('/wake')
		.get(function(request,response){

			fs.readFile(filename, 'utf8', function(err, fileContents) {
			  if (err) {
			  	data = {message:'could not read alarm', error:'occured at readFile'}
			  }else{
					data = {message:'optimal alarm is set', date: new Date(fileContents), human:  new Date(fileContents).toString()}
			  }
				response.json(data);
			});
		})
		.post(function(request,response){
			var nowTime = new Date();

			var wakeTime = algorithm.add10(nowTime);

			fs.writeFile(filename, wakeTime, function(err) {
	    	if(err) {
	        data = {message:'could not save alarm', error:'occured at writeFile'};
	    	} else {
					data = {message:'alarm set, you shall sleep well', date: wakeTime, human: new Date(wakeTime).toString()};
	    	}
    		response.json(data);
			});
		})



	app.use('/api', router)

}