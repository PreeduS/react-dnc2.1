#!/usr/bin/env node

//const spawn = require('child_process').spawn;
const spawn = require('cross-spawn');
const chalk = require('chalk');

process.on('unhandledRejection', err => {
    throw err;
});


//console.log(process.argv[2])

//const child = spawn('npm',['run','lint','./dev/app/index.js'],{cwd:'.',stdio:'inherit'});
const child = spawn('npm',['run','lint'],{cwd:'.',stdio:'inherit'});

/*
//child.stdout.pipe(process.stdout);
child.stdout.on('data', function(data){
    process.stdout.write(data)
});
child.stderr.on('data', function(data){
    process.exit(1)
});

*/

const childExit = code => {
    process.exit(code)
}


child.on('exit', (code) => {
    //process.exit(code)
    //process.exit(1)
    childExit(code)
});
child.on('error', (code) => {
    //process.exit(code)
    //process.exit(1)
    childExit(code)
});


process.on('exit', (code) => {  
    if(code === 0){
        console.log(chalk.green(`eslint exit status ${code}`));
    }else{
        console.log(chalk.red(`eslint exit status ${code}`));
    }
});


