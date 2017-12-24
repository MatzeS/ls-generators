
let writeFile = require('write');
import fs = require('fs');

export class LaserScript {

  sevenSegmentInserted:boolean = false;
  laserScript:string = "";

  x:number = 0;
  y:number = 0;

  constructor(){}

  append(text:string){
    this.laserScript += text + "\n";
  }

  cutText(text:string, x:number, y:number, w:number){
    if(!this.sevenSegmentInserted){
      this.sevenSegmentInserted = true;

      var sevenSegmentScript = fs.readFileSync('sevenSegment.ls','utf8');

      this.power(20);
      this.speed(100);
      this.laserScript = sevenSegmentScript + "\n \n" + this.laserScript;
    }
    this.append(`segment7write(${x}, ${y}, ${w}, "${text}");`);
  }

  power(x:number){
    this.append(`set("power", ${x});`);
  }

  speed(x:number){
    if(x == 0){
      console.log("zero speed is invalid!");
      return;
    }
    this.append(`set("speed", ${x});`);
  }

  // cuts a line between two given points
  line(x1:number, y1:number, x2:number, y2:number){
    this.moveTo(x1, y1);
    this.lineTo(x2, y2);
  }

  //moves the laser to the given point
  moveTo(x:number, y:number){
    this.append(`move(${x}, ${y});`);
    this.x = x;
    this.y = y;
  }

  // cuts a line form the current position to the given point
  lineTo(x:number, y:number){
    this.append(`line(${x}, ${y});`);
    this.x = x;
    this.y = y;
  }

  //cuts a line relative to the current position
  cut(x:number, y:number){
    this.lineTo(this.x + x, this.y + y);
  }

  rect(x:number, y:number, w:number, h:number){
    this.moveTo(x, y);
    this.cut(w, 0);
    this.cut(0, h);
    this.cut(-w, 0);
    this.cut(0, -h);
  }

  emit(file:string){

    if(file === undefined)
      console.log(this.laserScript);
    else
      writeFile(file + '.ls', this.laserScript, function(err:any) {
        if (err) console.log(err);
      });

    this.laserScript = "";

  }

}
