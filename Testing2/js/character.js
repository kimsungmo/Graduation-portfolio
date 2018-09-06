
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

var name_arr=[];
var i = 0;
var value = 0;
var canvas;	//canvas요소 생성
var context;
var images = {};
var totalResources = 7;	//이미지의 총 개수
var numResourcesLoaded = 0;	//현재 로드된 이미지의 개수
var fps = 30;	//기본 프레임 
var x=80,y=130;
var breathInc = 0.1;	//호흡의 빠르기를 지정
var breathDir = 1;	//들숨인지 날숨인지 판별할 변수
var breathAmt = 0;	//호흡의 총량을 결정할 변수
var breathMax = 2;	//호흡의 max값을 결정할 변수
var breathInterval = setInterval(updateBreath, 1000 / fps);	//숨을 쉬는 간격에 대한 변수
var area = 5;
prepareCanvas(document.getElementById("canvasDiv"), 250, 300);
function prepareCanvas(canvasDiv, canvasWidth, canvasHeight)	//canvas를 준비하는 변수
{
	canvas = document.createElement('canvas');	//canva요소 생성
	canvas.setAttribute('width', canvasWidth);	 //canvas의 넓이
	canvas.setAttribute('height', canvasHeight);  //canvas의 높이
	canvas.setAttribute('id', 'canvas');	//canvas의 이름
	canvasDiv.appendChild(canvas);	//canvas의 요소를 그림
	
	if(typeof G_vmlCanvasManager != 'undefined') {
		canvas = G_vmlCanvasManager.initElement(canvas);
	}
	context = canvas.getContext("2d"); // Grab the 2d canvas context
	
	loadImage("leftArm2");
	loadImage("leg2");
	loadImage("torso2");
	loadImage("hair2");
	loadImage("rightArm2");
	loadImage("ld");
	loadImage("ld2");
	loadImage("ld3");
	loadImage("ld4");
	loadImage("ld5");
	loadImage("ld6");
	loadImage("ld7");
	loadImage("ld8");
	loadImage("ld9");

	name_arr=["ld","ld2","ld3","ld4","ld5","ld6","ld7","ld8","ld9"];
}

function loadImage(name) {	//이미지를 불러올 함수 
  images[name] = new Image();	//새로운 이미지를 생성하고, 이미지 배열에 저장
  images[name].onload = function() {	//이미지를 준비
	  resourceLoaded();	//이미지에 대한 함수
  }
  images[name].src = "images/" + name + ".png";	//이미지 배열에 불러온 이미지를 저장
}

function resourceLoaded() {	//이미지에 대한 함수
  numResourcesLoaded += 1;	//이미지를 불러오고 현재 이미지를 몇번째 불러오는지를 저장 
  if(numResourcesLoaded === totalResources) {	//만약 6장 다 불러왔다면
	setInterval(redraw, 1000 / fps);	//이미지 배치 함수를 주기적으로 실행
	//setInterval(armdraw, 1000 / fps);	//이미지 배치 함수를 주기적으로 실행
  }
}

function redraw() {	//이미지의 배치에 대한 함수

	  canvas.width = canvas.width; // clears the canvas 

	  drawEllipse(x + 48, y + 23, 170 - breathAmt, 7); // Shadow

	  context.drawImage(images["leftArm2"], x + 42, y - 55 - breathAmt);
	  context.drawImage(images[name_arr[i]], x + 34, y - 122 - breathAmt);
	  context.drawImage(images["leg2"], x + 5, y - 24);
	  context.drawImage(images["torso2"], x+10 , y-60);
	  context.drawImage(images["hair2"], x - 37, y - 130 - breathAmt);
	  context.drawImage(images["rightArm2"], x - 10, y - 51 - breathAmt);

	  if (i >= 0 && value == 0){
	  	i++;
	    if(i == 8)
	  		value = 1;
	  }

	  if (i <= 8 && value == 1){
	  	i--;
	  	if(i == 0)
	  		value = 0;
	  }
}

function drawEllipse(centerX, centerY, width, height) {
  context.beginPath(); //그림을 그리기 위한 선언
  context.moveTo(centerX, centerY - height/2);	//지정한 위치로 포인터를 이동
  
  //3차 베지에 곡선을 그림
  context.bezierCurveTo(
	centerX + width/2, centerY - height/2,
	centerX + width/2, centerY + height/2,
	centerX, centerY + height/2);

  context.bezierCurveTo(
	centerX - width/2, centerY + height/2,
	centerX - width/2, centerY - height/2,
	centerX, centerY - height/2);
 
  context.fillStyle = "black";	//black으로 그린 부분을 채워줌
  context.fill();	
  context.closePath();
}

function updateBreath() { 				
  if (breathDir === 1) {  // breath in
	breathAmt -= breathInc;	//호홉의 총량에 호흡의 빠르기를 빼줌
	if (breathAmt < -breathMax) {	//호흡의 총량이 max값보다 작아진다면
	  breathDir = -1;	//날숨으로 바꿈 
	}
  } else {  // breath out
	breathAmt += breathInc;	
	if(breathAmt > breathMax) {
	  breathDir = 1;
	}
  }
}