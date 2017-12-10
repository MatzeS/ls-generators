#!/usr/bin/env node

import program = require('commander');
import {LaserScript} from './laserscript';

let ls = new LaserScript();

let file;

program
	.arguments('<file>')
	.option('-a, --length <length>', 'The length of one side of a square bowl')
	.option('-h, --height <height>', 'The height of the bowl')

	.option('-e, --edge <edge>', 'The number of horizontal joints along the sides')
	.option('-b, --base <base>', 'The number of vertical joints at the bottom')
	.option('-k, --kerf <kerf>', 'The kerf width')
	.option('-m, --material <material>', 'The thickness of the material')

	.option('-p, --power <power>', 'The power of the laser in percent')
	.option('-s, --speed <speed>', 'The speed of the laser in percent')

	.action(function(pFile){
		file = pFile;
	})
  .parse(process.argv);

file = program.file || 'bowl';

let size = program.length || 50;
let height = program.height || 40;

let sideJoinNum = program.edge || 2;
let baseJoinNum = program.base || 5;

let thickness = program.material || 3;

// to fit a 3mm piece you need 2.7mm gab assuming a bit more makes the joint even tighter
let kerf = program.kerf/2 || 0.18;

let sideJoinStep = height/(sideJoinNum*2 + 1);
let baseJoinStep = size/(baseJoinNum*2 + 1);


// side piece
ls.speed(program.speed || 90);
ls.power(program.power || 100);

// right section, kerf adjusted
ls.moveTo(0, 0);
ls.cut(size, 0); // upper cut
ls.cut(0, sideJoinStep  - kerf);
for(let i = 0; i < sideJoinNum; i++){
	ls.cut(thickness, 0); // right
	ls.cut(0, sideJoinStep + 2*kerf); // down
	ls.cut(-thickness, 0); // left
	ls.cut(0, sideJoinStep - 2*kerf); // down
}
ls.cut(0, kerf);

// left section
ls.moveTo(0, 0);
ls.cut(0, sideJoinStep);
for(let i = 0; i < sideJoinNum; i++){
	ls.cut(thickness, 0); // right
	ls.cut(0, sideJoinStep); // down
	ls.cut(-thickness, 0); // left
	ls.cut(0, sideJoinStep); // down
}

ls.moveTo(0, height);
ls.cut(baseJoinStep - kerf, 0);
for(let i = 0; i < baseJoinNum; i++){
	ls.cut(0, thickness); // down
	ls.cut(baseJoinStep + 2*kerf, 0); // right, positive part is thickened
	ls.cut(0, -thickness); // up
	ls.cut(baseJoinStep - 2*kerf, 0); // right, negative part is normal
}

ls.cut(kerf, 0); // right, negative part is normal

ls.emit(file + '-side');



// bottom piece
ls.speed(program.speed || 90);
ls.power(program.power || 100);

ls.moveTo(0, 0);
ls.cut(thickness, 0);
for(let i = 0; i < baseJoinNum; i++){
	ls.cut(baseJoinStep, 0);
	ls.cut(0, thickness);
	ls.cut(baseJoinStep, 0);
	ls.cut(0, -thickness);
}
ls.cut(baseJoinStep, 0);

ls.cut(0, thickness);
for(let i = 0; i < baseJoinNum; i++){
ls.cut(0, baseJoinStep);
ls.cut(-thickness, 0);
ls.cut(0, baseJoinStep);
ls.cut(thickness, 0);
}
ls.cut(0, baseJoinStep);

ls.cut(-thickness, 0);
for(let i = 0; i < baseJoinNum; i++){
	ls.cut(-baseJoinStep, 0);
	ls.cut(0, -thickness);
	ls.cut(-baseJoinStep, 0);
	ls.cut(0, thickness);
}
ls.cut(-baseJoinStep, 0);

ls.cut(0, -thickness);
for(let i = 0; i < baseJoinNum; i++){
	ls.cut(0, -baseJoinStep);
	ls.cut(thickness, 0);
	ls.cut(0, -baseJoinStep);
	ls.cut(-thickness, 0);
}
ls.cut(0, -baseJoinStep);

ls.emit(file + "-bottom");
