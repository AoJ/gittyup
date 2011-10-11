var fs = require('fs'),                
spawn = require('child_process').spawn;

exports.test = function(ops)
{
	var files = fs.readdirSync(ops.appDir);


	for(var i = files.length; i--;)
	{
		var file = files[i];

		if(file == 'package.json')
		{
			return true;
			/*try
			{
				var config = JSON.parse(fs.readFileSync(ops.path + '/' + file, 'utf8'));

				return config.main.split('.').pop() == 'js';
			}
			catch(e)
			{
				
			} 
			break;*/
		}
	}

	return false;
}


exports.link = function(ops, callback)
{
	console.log("Linking with npm: " + ops.appDir);   
	
	var npm = spawn('sudo',['npm','install','--unsafe-perm'], { cwd: ops.appDir });
	
	       
	npm.stdout.on('data', function(data)
	{
		console.log(data.toString());
	});
	
	npm.stderr.on('data', function(data)
	{
		console.error(data.toString());
	});
	
	npm.on('exit', callback);

	// exec('sudo npm install --unsafe-perm', { cwd: ops.appDir }, callback);
}