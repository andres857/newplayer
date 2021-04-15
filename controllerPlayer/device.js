var exec = require('child_process').exec;

//function to restart rpi
function shutdown(callback){
	exec('sudo /sbin/shutdown -r now', function(error, stdout, stderr)
		{callback(stdout);}
		);
	}

module.exports={
	shutdown
}