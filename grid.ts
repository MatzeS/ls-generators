#!/usr/bin/env node

import program = require('commander');
import {LaserScript} from './laserscript';

let ls = new LaserScript();

let inquirer = require("inquirer");

let query = [
    {type: 'input', name: 'speedStart', message: 'Start value for speed?', default: '10'},
    {type: 'input', name: 'speedInc', message: 'Increase power per step?', default: '10'},
    {type: 'input', name: 'speedNum', message: 'Number of speed steps?', default: '10'},
    {type: 'input', name: 'powerStart', message: 'Start value for power?', default: '10'},
    {type: 'input', name: 'powerInc', message: 'Increase power per step?', default: '10'},
    {type: 'input', name: 'powerNum', message: 'Number of speed steps?', default: '10'},
    {type: 'input', name: 'width', message: 'Width of a single triangle?', default: '5'},
    {type: 'input', name: 'height', message: 'Height of a single triangle?', default: '10'},
    {type: 'input', name: 'file', message: 'Filename?', default: 'grid'},
];

inquirer.prompt(query).then(function (answers:any) {

    let file:string = answers.file;

    let w:number = Number(answers.width);
    let h:number = Number(answers.height);

    let ns:number = Number(answers.speedNum);
    let np:number = Number(answers.powerNum);

    let ss:number = Number(answers.powerStart);
    let sp:number = Number(answers.speedStart);

    let is:number = Number(answers.speedInc);
    let ip:number = Number(answers.powerInc);

    // 0 is invalid
    if (ss == 0) {
        ss = is;
        ns--;
    }
    if (sp == 0) {
        sp = ip;
        np--;
    }

    let perimeter = 5;
    let padding = 3;
    let tw = (w / 2 - 1);
    let lt = 5;
    let textPadding = 2;

    ls.cutText("SPEED", 30, perimeter, lt);

    let powerTextTopPadding = 30;
    ls.cutText("P", perimeter, powerTextTopPadding + 0 * (2 * lt + textPadding), lt);
    ls.cutText("O", perimeter, powerTextTopPadding + 1 * (2 * lt + textPadding), lt);
    ls.cutText("W", perimeter, powerTextTopPadding + 2 * (2 * lt + textPadding), lt);
    ls.cutText("E", perimeter, powerTextTopPadding + 3 * (2 * lt + textPadding), lt);
    ls.cutText("R", perimeter, powerTextTopPadding + 4 * (2 * lt + textPadding), lt);

    let lastX = 0;
    let lastY = 0;

    for (let p = 0; p < np; p++) {
        let power = p * ip + sp;
        ls.cutText(`${power}`, perimeter + lt + textPadding, perimeter + 2 * lt + textPadding + 2*tw + textPadding + p * (h + padding), tw);
    }

    for (let s = 0; s < ns; s++) { // speed on x axis

        let x = perimeter + lt + textPadding + 2 * (tw + textPadding) + s * (w + padding);
        let speed = s * is + ss;

        ls.cutText(`${speed}`, x, perimeter + 2 * lt + textPadding, tw);

        for (let p = 0; p < np; p++) { // power on y axis

            let y = perimeter + 2*lt + textPadding + 2*tw + textPadding + p * (h + padding);
            let power = p * ip + sp;

            ls.speed(speed);
            ls.power(power);
            ls.triangle(x, y, w, h);

            lastX = x;
            lastY = y;

        }
    }

    ls.speed(50);
    ls.power(100);
    ls.rect(0, 0, lastX + w + perimeter, lastY + h + perimeter);

    ls.emit(file);

});
