#!/usr/bin/env node

import program = require('commander');
import {LaserScript} from './laserscript';

let ls = new LaserScript();

let file;

program
	.arguments('<file>')
  .option('-w, --width <width>', 'The width of a triangle')
  .option('-h, --height <height>', 'The height of a triangle')
  .option('-n, --num <num>', 'Number of triangles for speed')
  .option('-s, --start <start>', 'Number of triangles for power')
  .option('-i, --increase <increase>', 'Starting value for speed (excluded)')
  .option('-p, --power <power>', 'Number of triangles for power')
  .option('-e, --speed <speed>', 'Starting value for speed (excluded)')
	.action(function(pFile){
		file = pFile;
	})
  .parse(process.argv);


let power = program.power || 100;
let speed = program.speed || 100;

let w = program.width || 50;
let h = program.height || 40;
let d = 20;

let increase = program.increase || 0.05;
let start = program.start || 3;
let num = program.num || 10;

let spacing = 10;
let end_width = start;

ls.speed(speed);
ls.power(power);

for(let i = 0; i < num; i++){
  ls.rect(spacing +  (spacing + start) * i, 0, start - i*increase, d);
}

ls.rect(0, 0, (start+spacing)*(num) + spacing, h);

ls.cutText(`POWER${power} SPEED${speed}`, 5, d+5, 3.2);

if(file === undefined)
  file = `press-fit-test-power${power}-speed${speed}`;
ls.emit(file);
