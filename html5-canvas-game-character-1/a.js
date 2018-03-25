
// Copyright 2011 William Malone (www.williammalone.com)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var canvas;
var context;
var images = {};
var totalResources = 6; //이미지 총 개수
var numResourcesLoaded = 0; //화면에 출력된 이미지 개수
var fps = 30; //Frame Per Second
var x = 245;
var y = 185;
var breathInc = 0.1;
var breathDir = 1; //1이면 숨을 마심 -1이면 내쉼
var breathAmt = 0;
var breathMax = 2;
var breathInterval = setInterval(updateBreath, 1000 / fps); //0.033초 마다 함수 호출
var maxEyeHeight = 14;
var curEyeHeight = maxEyeHeight;
var eyeOpenTime = 0;
var timeBtwBlinks = 4000;
var blinkUpdateTime = 200;                    
var blinkTimer = setInterval(updateBlink, blinkUpdateTime); //setInterval(func, delay time)
var fpsInterval = setInterval(updateFPS, 1000);
var numFramesDrawn = 0;
var curFPS = 0;

function updateFPS() {
   
   curFPS = numFramesDrawn;
   numFramesDrawn = 0;
}      
function prepareCanvas(canvasDiv, canvasWidth, canvasHeight)
{
   // Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
   canvas = document.createElement('canvas');
   canvas.setAttribute('width', canvasWidth);
   canvas.setAttribute('height', canvasHeight);
   canvas.setAttribute('id', 'canvas');
   canvasDiv.appendChild(canvas);
   
   if(typeof G_vmlCanvasManager != 'undefined') {
      canvas = G_vmlCanvasManager.initElement(canvas);
   }
   context = canvas.getContext("2d"); // Grab the 2d canvas context
   // Note: The above code is a workaround for IE 8and lower. Otherwise we could have used:
   //     context = document.getElementById('canvas').getContext("2d");
   
   loadImage("leftArm");
   loadImage("legs");
   loadImage("torso");
   loadImage("rightArm");
   loadImage("head");
   loadImage("hair");
}

function loadImage(name) {

  images[name] = new Image();
  images[name].onload = function() { 
     resourceLoaded();
  }
  images[name].src = "images/" + name + ".png";
}

function resourceLoaded() {

  numResourcesLoaded += 1;
  if(numResourcesLoaded === totalResources) {
  
   setInterval(redraw, 1000 / fps);
  }
}

function redraw() {
            
  canvas.width = canvas.width; // clears the canvas 

  drawEllipse(x + 40, y + 29, 160 - breathAmt, 6); // Shadow

  context.drawImage(images["leftArm"], x + 40, y - 42 - breathAmt);
  context.drawImage(images["legs"], x, y);
  context.drawImage(images["torso"], x, y - 50);
  context.drawImage(images["head"], x - 10, y - 125 - breathAmt);
  context.drawImage(images["hair"], x - 37, y - 138 - breathAmt);
  context.drawImage(images["rightArm"], x - 15, y - 42 - breathAmt);
   
  drawEllipse(x + 47, y - 68 - breathAmt, 8, curEyeHeight); // Left Eye
  drawEllipse(x + 58, y - 68 - breathAmt, 8, curEyeHeight); // Right Eye
  
  context.font = "bold 12px sans-serif";
  context.fillText("fps: " + curFPS + "/" + fps + " (" + numFramesDrawn + ")", 40, 200);
  ++numFramesDrawn;
}

function drawEllipse(centerX, centerY, width, height) { //눈 그리기

  context.beginPath(); 
  
  context.moveTo(centerX, centerY - height/2);//눈동자의 가운데 왼쪽부터 시작
  
  context.bezierCurveTo( //눈동자 윗 부분     
   centerX + width/2, centerY - height/2,
   centerX + width/2, centerY + height/2,
   centerX, centerY + height/2);

  context.bezierCurveTo( //눈동자 아랫 부분
   centerX - width/2, centerY + height/2,
   centerX - width/2, centerY - height/2,
   centerX, centerY - height/2);
 
  context.fillStyle = "black";
  context.fill();
  context.closePath();   
}

function updateBreath() { 
            
  if (breathDir === 1) {  // breath in 들숨인 동안에
   breathAmt -= breathInc; //숨을 들이 마시면 캐릭터의 몸이 위로 움직임
   if (breathAmt < -breathMax) { //숨을 최대로 마셨으면
     breathDir = -1; //숨을 내쉼
   }
  } else {  // breath out
   breathAmt += breathInc; //숨을 내쉬면 캐릭터의 상체가 아래로 움직임
   if(breathAmt > breathMax) { //숨을 최대로 내뱉었으면
     breathDir = 1; //숨을 들이쉼
   }
  }
}

function updateBlink() { 
            
  eyeOpenTime += blinkUpdateTime; //0.2초 마다 눈 뜬 시간을 누적함
   
  if(eyeOpenTime >= timeBtwBlinks){ //눈 뜨고 있는 시간이 4초를 넘어가면 눈 깜빡임.
   blink();
  }
}

function blink() {

  curEyeHeight -= 1; //14에서 1씩 뻄
  if (curEyeHeight <= 0) { //눈의 높이가 0이하면
   eyeOpenTime = 0; //눈 뜬 시간을 0초로 초기화
   curEyeHeight = maxEyeHeight; //눈의 높이를 다시 14로 설정
  } else {
   setTimeout(blink, 10); //눈의 높이가 0보다 크면 0.01초 간격으로 blink 호출
  }
}