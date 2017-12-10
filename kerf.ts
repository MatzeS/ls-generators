#!/usr/bin/env node

import program = require('commander');
import {LaserScript} from './laserscript';

let ls = new LaserScript();

let file;

program
  .arguments('<file>')
  .option('-w, --width <width>', 'The total width of the test piece')
  .option('-h, --height <height>', 'The total height of the test piece')
  .option('-n, --num <num>', 'Number of slices to cut')
  .option('-f, --frame <frame>', 'Perimeter around the slices, the frame thickness')
  .option('-b, --breakingPoint <breakingPoint>', 'Width of the predetermined breaking point of the slices')
  .option('-p, --power <power>', 'Cutting power')
  .option('-s, --speed <speed>', 'Cutting speed')
  .action(function(pFile){
    file = pFile;
  })
  .parse(process.argv);

let w:number = Number(program.width) || 200;
let h:number = Number(program.height) || 100;
let f:number = program.frame || 10;
let breakingPoint:number = program.breakingPoint || 0.5;

let num:number = program.num || 10;

let power:number = program.power || 100;
let speed:number = program.speed || 50;

let sw:number = (w - 2*f)/num;
let sh:number = h - 2*f;

console.log("width: %s, height: %s, frame: %s", w, h, f);
console.log("cutting power: %s", power);
console.log("cutting speed: %s", speed);
console.log("number of slices: %s", num);
console.log("slice width: %s", sw);

ls.speed(speed);
ls.power(power);

for(let i = 0; i < num; i++){
  ls.moveTo(f + i*sw, f);
  ls.cut(0, sh);
  ls.cut(sw - breakingPoint, 0);
}
ls.moveTo(f + num*sw, f);
ls.cut(0, sh);

ls.line(f, f, w - f, f);

//outer trace
ls.rect(0, 0, w, h);

if(file === undefined)
  file = "kerf";

ls.emit(file);
