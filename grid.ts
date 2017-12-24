#!/usr/bin/env node

const numberTextSize = 3;
const headingTextSize = 6;
const textSpacing = 2;

const triangleWidth = 10;
const triangleHeight = 6;
const triangleSpacing = 3;

const borderSpacing = 8;

const separationSpeed = 50;
const separationPower = 100;

import program = require('commander');
import {LaserScript} from './laserscript';

let ls = new LaserScript();

function triangle(x: number, y: number, w: number, h: number) {
    ls.line(x, y, x + w, y); //top
    ls.line(x + w, y, x + w, y + h); // right
    ls.line(x + w, y + h, x, y); // bottom
}


let inquirer = require("inquirer");

let query = [
    {type: 'input', name: 'speedStart', message: 'Start value for speed:', default: '10'},
    {type: 'input', name: 'speedInc', message: 'Increase power per step:', default: '10'},
    {type: 'input', name: 'speedNum', message: 'Number of speed steps::', default: '10'},
    {type: 'input', name: 'powerStart', message: 'Start value for power:', default: '10'},
    {type: 'input', name: 'powerInc', message: 'Increase power per step:', default: '10'},
    {type: 'input', name: 'powerNum', message: 'Number of speed steps:', default: '10'},
    {type: 'input', name: 'separationPower', message: 'Separation power', default: '100'},
    {type: 'input', name: 'separationSpeed', message: 'Separation speed', default: '50'},
    {type: 'input', name: 'file', message: 'Filename?', default: 'generated/grid'},
];

inquirer.prompt(query).then(function (answers: any) {

    let file: string = answers.file;

    let speedNumber: number = Number(answers.speedNum);
    let powerNumber: number = Number(answers.powerNum);

    let speedStart: number = Number(answers.powerStart);
    let powerStart: number = Number(answers.speedStart);

    let speedIncrement: number = Number(answers.speedInc);
    let powerIncrement: number = Number(answers.powerInc);

    // 0 is invalid
    if (speedStart == 0) {
        speedStart = speedIncrement;
        speedNumber--;
        console.log('Speed of 0 is invalid, removing first value');
    }
    if (powerStart == 0) {
        powerStart = powerIncrement;
        powerNumber--;
        console.log('Power of 0 is invalid, removing first value');
    }

    const powerHeadingX = borderSpacing;
    const powerNumberX = powerHeadingX + 2 * headingTextSize + textSpacing;

    const speedHeadingY = borderSpacing;
    const speedNumberY = speedHeadingY + 2 * headingTextSize + textSpacing;


    const gridXOrigin = borderSpacing + headingTextSize + textSpacing + 2 * (numberTextSize + textSpacing) + textSpacing;
    const gridYOrigin = borderSpacing + 2 * headingTextSize + textSpacing + 2 * numberTextSize + textSpacing;
    const gridWidth = speedNumber * (triangleWidth + triangleSpacing);
    const gridHeight = powerNumber * (triangleHeight + triangleSpacing);


    const totalWidth = gridXOrigin + gridWidth + borderSpacing;
    const totalHeight = gridYOrigin + gridHeight + borderSpacing;

    const speedHeadingX = gridXOrigin + (gridWidth - 5 * 1.5 * headingTextSize) / 2;
    const powerHeadingY = gridYOrigin + (gridHeight - 5 * 2.5 * headingTextSize) / 2;


    ls.cutText("SPEED", speedHeadingX, speedHeadingY, headingTextSize);

    const word = 'POWER';
    for (let i = 0; i < word.length; i++)
        ls.cutText(word.charAt(i),
            powerHeadingX,
            powerHeadingY + i * (2.5 * headingTextSize),
            headingTextSize);


    for (let p = 0; p < powerNumber; p++) {
        let power = powerStart + p * powerIncrement;
        ls.cutText(`${power}`,
            powerHeadingX + headingTextSize * 1.5,
            gridYOrigin + p * (triangleHeight + triangleSpacing),
            numberTextSize);
    }

    for (let s = 0; s < speedNumber; s++) {
        let speed = speedStart + s * speedIncrement;

        ls.cutText(`${speed}`,
            gridXOrigin + s * (triangleWidth + triangleSpacing) + (triangleWidth - numberTextSize * 2.5) / 2,
            speedHeadingY + 2 * headingTextSize + textSpacing,
            numberTextSize
        )
        ;
    }


    for (let s = 0; s < speedNumber; s++) { // speed on x axis
        let x = gridXOrigin + s * (triangleWidth + triangleSpacing);
        let speed = speedStart + s * speedIncrement;

        for (let p = 0; p < powerNumber; p++) { // power on y axis
            let y = gridYOrigin + p * (triangleHeight + triangleSpacing);
            let power = powerStart + p * powerIncrement;

            ls.speed(speed);
            ls.power(power);
            triangle(x, y, triangleWidth, triangleHeight);
        }
    }


    ls.speed(separationSpeed);
    ls.power(separationPower);
    ls.rect(0, 0, totalWidth, totalHeight);

    ls.emit(file);

});
