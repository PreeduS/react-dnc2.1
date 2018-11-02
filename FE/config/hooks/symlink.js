var fs = require('fs');
var path = require('path');

console.log('argv ',process.argv)
													//wips
const hooksPath = './base' 	

const gitHooksPath = './target' 
const relativeHooksPath = '../base';	//relative to git hooks dir

fs.readdir(hooksPath,{withFileTypes:true},(err,files) => {

	if(files){
		files.forEach(file => {
			let fileName = path.parse(file).name; 				//trim extension
			let filePath = path.join(gitHooksPath , fileName);
			
			fs.lstat(filePath,(err, stats) => {
				let exists = false;
				if(!err){
					exists = stats.isSymbolicLink();
				}
				
				console.log('wat ',filePath,err,stats)
				if(!exists){
	
					fs.symlink( relativeHooksPath + '/'+file, filePath, err => {
						if(err){		//&& err.code !== 'EEXIST'
							console.log('symlink err ', err)
							if(err.code === 'EPERM'){
								console.log('EPERM')
							}
							process.exit(1)		
						}else{
							console.log('fileName ',fileName,' added')
						}
		
					});
							
				}else{
					console.log('fileName: ',fileName,' exists')
				}
				
				
			});
				
			
		})
		
	}
	
})


/*
fs.stat('./target/a', (err, stats) => {

	console.log('isFile ',stats.isFile())
});
*/







/*
fs.symlink('../base/a.txt', './target/a', err => {
	console.log('cb ',err);
	process.stdout.write('test1')
	process.stdout.write('test2')
});

*/

/*

var prm = new Promise( (res, rej) => {
	setTimeout( ()=>{
		//rej('le err')
		throw('le err2')
	},500)
})


*/