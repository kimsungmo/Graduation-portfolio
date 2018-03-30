
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
var images = {};
var totalResources = 6;	//load할 이미지의 총 개수
var numResourcesLoaded = 0;	//현재 load된 이미지의 개수
var fps = 30;	//기본 interval 설정 값
var x = 245;	//기본 x좌표
var y = 185;	//기본 y좌표
var breathInc = 0.1;	//호흡의 빠르기
var breathDir = 1;	//호흡이 들숨인지 날숨인지 판정
var breathAmt = 0;	//호흡의 총량
var breathMax = 2;	//호흡을 바꿔주기 위한 변수 
var breathInterval = setInterval(updateBreath, 1000 / fps);
var maxEyeHeight = 14;
var curEyeHeight = maxEyeHeight;
var eyeOpenTime = 0;
var timeBtwBlinks = 4000;
var blinkUpdateTime = 200;                    
var blinkTimer = setInterval(updateBlink, blinkUpdateTime);

function prepareCanvas(canvasDiv, canvasWidth, canvasHeight)
{
	// Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
	canvas = document.createElement('canvas');	//canvas 요소생성
	canvas.setAttribute('width', canvasWidth);	//canvas의 넓이
	canvas.setAttribute('height', canvasHeight);	//canvas의 높이
	canvas.setAttribute('char', 'canvas');	//canvas의 속성을 char로 지정
	canvasDiv.appendChild(canvas);	//canvas에 저장한 요소들의 값을 추가
	
	context = canvas.getContext("2d"); // Grab the 2d canvas context
	// Note: The above code is a workaround for IE 8and lower. Otherwise we could have used:
	//     context = document.getElementById('canvas').getContext("2d");
	
	loadImage("leftArm2");
	loadImage("legs");
	loadImage("torso");
	loadImage("rightArm");
	loadImage("head");
	loadImage("hair");
}

function loadImage(name) {	//Imageload관련 함수

  images[name] = new Image();	//각 이미지의 이름에 맞는 새로운 이미지 생성
  images[name].onload = function() { 
	  resourceLoaded();	//
  }
  images[name].src = "images/" + name + ".png";
}

function resourceLoaded() {

  numResourcesLoaded += 1;
  if(numResourcesLoaded === totalResources) { 	//각 부위별로 6개의 이미지가 로드되었다면
	setInterval(redraw, 1000 / fps);	//fps30을 기준으로 1000을 나눠 지속적으로 redraw함수를 실행 
  }
}

function redraw() {
				
  canvas.width = canvas.width; // clears the canvas 잔상이 남지 않도록 

  drawEllipse(x + 40, y + 29, 160 - breathAmt, 6); // Shadow

  context.drawImage(images["leftArm2"], x + 40, y - 42 - breathAmt);
  context.drawImage(images["legs"], x, y);
  context.drawImage(images["torso"], x, y - 50);
  context.drawImage(images["head"], x - 10, y - 125 - breathAmt);
  context.drawImage(images["hair"], x - 37, y - 138 - breathAmt);
  context.drawImage(images["rightArm"], x - 15, y - 42 - breathAmt);
	
  drawEllipse(x + 47, y - 68 - breathAmt, 8, curEyeHeight); // Left Eye
  drawEllipse(x + 58, y - 68 - breathAmt, 8, curEyeHeight); // Right Eye
}

function drawEllipse(centerX, centerY, width, height) {	//단순히 그림을 그리는 함수

  context.beginPath();
  
  context.moveTo(centerX, centerY - height/2);	//지정한 위치값으로 펜을 이동
  
  /*
  3차 베지에 곡선을 그림 (XX, YY, XX2, YY2, x, y)
  (XX, YY)와 (XX2, YY2)로 설정된 기준점을 사용하여, (x, y)좌표로 주어진 끝점 까지
  삼차 베지에 곡선을 그림
  */

  context.bezierCurveTo(
	centerX + width/2, centerY - height/2,
	centerX + width/2, centerY + height/2,
	centerX, centerY + height/2);

  context.bezierCurveTo(
	centerX - width/2, centerY + height/2,
	centerX - width/2, centerY - height/2,
	centerX, centerY - height/2);
 
  context.fillStyle = "black";
  context.fill();
}

function updateBreath() {	//호흡 관련 함수
				
  if (breathDir === 1) {  // breath in
	breathAmt -= breathInc;	//호흡의 총량에 지속적으로 -값을 취함
	if (breathAmt < -breathMax) {	//호흡의 총량이 설정한 MAX값보다 작아지면 breathDir = -1로 설정하여 날숨 실행
	  breathDir = -1;
	}
  }
   else {  // breath out
	breathAmt += breathInc;	//호흡의 총량에 지속적으로 +값을 취함
	if(breathAmt > breathMax) {	//호흡의 총량이 설정한 MAX값보다 커지면 breathDir = +1로 설정하여 들숨 실행
	  breathDir = 1;
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

  curEyeHeight -= 1; //14에서 1씩 ㅤㅃㅒㅁ
  if (curEyeHeight <= 0) { //눈의 높이가 0이하면
   eyeOpenTime = 0; //눈 뜬 시간을 0초로 초기화
   curEyeHeight = maxEyeHeight; //눈의 높이를 다시 14로 설정
  } else {
   setTimeout(blink, 10); //눈의 높이가 0보다 크면 0.01초 간격으로 blink 호출
  }
}