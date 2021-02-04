
let speechAPI;
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {

    speechAPI = true;
  } else {

    speechAPI = false;
    console.log("Speech API is not supported by this browser, use Chrome or Edge");

  }
let myRec = new p5.SpeechRec('en-US', parseResult);
myRec.continuous = true;
myRec.interimResults = true;

function setup()
{
    myRec.start(); // start engine
}


const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

// begin hier met jouw code voor deze opdracht

// declare namespace

let spriteSheet,sw,sh,greenTank,backGround,ride;


let tileWidth = 84;
let tileHeight = 84;
let tilesOnOneRow = 19;

ride = false;

spriteSheet = new Image();
spriteSheet.src = "images/tanksheet.png";

greenTank = {};
greenTank.animationArray = [8,7,6,5,4,3,2,1];
greenTank.index = 0;
greenTank.direction = 0;
greenTank.speed = 10;

greenTank.radius = 40;

greenTank.x = 800;
greenTank.y = 630;

greenTank.vx = 0;
greenTank.vy = 0;

greenTank.indexPosition = 0;

greenTank.draw = function(){
  greenTank.sx = greenTank.animationArray[greenTank.index]%8 * 84;
  greenTank.sy = Math.floor(greenTank.animationArray[greenTank.index]/8) * 84;
  context.save();
  context.translate(greenTank.x,greenTank.y);
  context.rotate(greenTank.direction);

  context.drawImage(spriteSheet,greenTank.sx,greenTank.sy,84,84,-42,-42,84,84)
  context.restore();
  context.beginPath();
  context.strokeStyle = "yellow";
  context.lineWidth = "5";
  context.rect(greenTank.indexPosition%tilesOnOneRow*tileWidth,Math.floor(greenTank.indexPosition/
  tilesOnOneRow)*tileHeight,tileWidth,tileHeight);
  context.stroke();
}

greenTank.update = function(){
  greenTank.indexPosition = (Math.floor(greenTank.y/84) * tilesOnOneRow) + Math.floor(greenTank.x / tileWidth);
  greenTank.x += greenTank.vx;
  greenTank.y += greenTank.vy;  

  if(greenTank.y < 0){
    greenTank.y = height;
  }
  if(greenTank.x < 0){
    greenTank.x = width;
  }
    if(greenTank.y > height){
    greenTank.y = 0;
  }
    if(greenTank.x > width){
    greenTank.x = 0;
  }
}

function parseResult()
{
    // recognition system will often append words into phrases.
    // so hack here is to only use the last word:
    let mostrecentword = myRec.resultString.split(' ').pop();
    if(mostrecentword.indexOf("left")!==-1) { greenTank.vx = -greenTank.speed; greenTank.vy = 0; greenTank.direction = 1.5 * Math.PI;}
    else if(mostrecentword.indexOf("up")!==-1) { greenTank.vx = 0; greenTank.vy = -greenTank.speed; greenTank.direction = 0;}
    else if(mostrecentword.indexOf("down")!==-1) { greenTank.vx = 0; greenTank.vy = greenTank.speed; greenTank.direction = Math.PI;}
    else if(mostrecentword.indexOf("right")!==-1) { greenTank.vx = greenTank.speed; greenTank.vy = 0; greenTank.direction = 0.5 * Math.PI;}
    console.log(mostrecentword);
}


/*
window.addEventListener('keydown',(e)=>{
  //console.log(e.key)
  switch (e.key){
        case "ArrowRight":
          ride = true;
            greenTank.vx = greenTank.speed;
            greenTank.vy = 0;
            greenTank.direction = 0.5 * Math.PI;
        break;
        case "ArrowDown":
          ride = true;
            greenTank.vx = 0;
            greenTank.vy = greenTank.speed;
            greenTank.direction = Math.PI;
        break;
        case "ArrowLeft":
          ride = true;
            greenTank.vx = -greenTank.speed;
            greenTank.vy = 0;
            greenTank.direction = 1.5 * Math.PI;
        break;
        case "ArrowUp":
          ride = true;
            greenTank.vx = 0;
            greenTank.vy = -greenTank.speed;
            greenTank.direction = 0;
        break;
  default:
  }
})

window.addEventListener('keyup',(e)=>{
  //console.log(e.key)
  ride = false;
  switch (e.key){
        case "ArrowRight":
            greenTank.vx = 0;
            greenTank.vy = 0;
            greenTank.direction = 0.5 * Math.PI;
        break;
        case "ArrowDown":
            greenTank.vx = 0;
            greenTank.vy = 0;
            greenTank.direction = Math.PI;
        break;
        case "ArrowLeft":
            greenTank.vx = 0;
            greenTank.vy = 0;
            greenTank.direction = 1.5 * Math.PI;
        break;
        case "ArrowUp":
            greenTank.vx = 0;
            greenTank.vy = 0;
            greenTank.direction = 0;
        break;
  default:
  }
})
*/


spriteSheet.addEventListener('load',()=>{
  sw = spriteSheet.width/8;
  sh = spriteSheet.height/4
  setInterval(animate,100);
});

function animate(){
  context.clearRect(0,0,width,height);
  drawBackGround();
  greenTank.update();
  greenTank.draw();
  if(ride == true){
    greenTank.index += 1;
  }
  if(greenTank.index >= greenTank.animationArray.length){
    greenTank.index = 0
  }
  console.log(greenTank.x,greenTank.y,greenTank.indexPosition)
}

  backGround = [31,31,31,31,31,31,0,0,0,0,0,0,0,31,31,31,31,31,31,
                31,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,31,
                31,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,31,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                31,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,31,
                31,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,31,
                31,31,31,31,31,31,0,0,0,0,0,0,0,31,31,31,31,31,31
                ];

  let collisionArray = [0,1,2,3,4,5,13,14,15,16,17,18,
                19,37,
                38,56,
                114,132,
                133,151,
                152,153,154,155,156,157,165,166,167,168,169,170];

  function drawBackGround(){

  for (i=0;i<backGround.length;i++){




        let tileX = (i % tilesOnOneRow) * tileWidth;
        let tileY = Math.floor(i/tilesOnOneRow) * tileHeight;

        let sX = (backGround[i] % tilesOnOneRow) * tileHeight;
        let sY = Math.floor(backGround[i]/tilesOnOneRow) * tileHeight;

        context.drawImage(spriteSheet,sX,sY,84,84,tileX,tileY,84,84);

          //tileSet = new Array(sX);
    }
  }
