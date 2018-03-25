
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
var totalResources = 6;	//load�� �̹����� �� ����
var numResourcesLoaded = 0;	//���� load�� �̹����� ����
var fps = 30;	//�⺻ interval ���� ��
var x = 245;	//�⺻ x��ǥ
var y = 185;	//�⺻ y��ǥ
var breathInc = 0.1;	//ȣ���� ������
var breathDir = 1;	//ȣ���� ������� �������� ����
var breathAmt = 0;	//ȣ���� �ѷ�
var breathMax = 2;	//ȣ���� �ٲ��ֱ� ���� ���� 
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
	canvas = document.createElement('canvas');	//canvas ��һ���
	canvas.setAttribute('width', canvasWidth);	//canvas�� ����
	canvas.setAttribute('height', canvasHeight);	//canvas�� ����
	canvas.setAttribute('char', 'canvas');	//canvas�� �Ӽ��� char�� ����
	canvasDiv.appendChild(canvas);	//canvas�� ������ ��ҵ��� ���� �߰�
	
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

function loadImage(name) {	//Imageload���� �Լ�

  images[name] = new Image();	//�� �̹����� �̸��� �´� ���ο� �̹��� ����
  images[name].onload = function() { 
	  resourceLoaded();	//
  }
  images[name].src = "images/" + name + ".png";
}

function resourceLoaded() {

  numResourcesLoaded += 1;
  if(numResourcesLoaded === totalResources) { 	//�� �������� 6���� �̹����� �ε�Ǿ��ٸ�
	setInterval(redraw, 1000 / fps);	//fps30�� �������� 1000�� ���� ���������� redraw�Լ��� ���� 
  }
}

function redraw() {
				
  canvas.width = canvas.width; // clears the canvas �ܻ��� ���� �ʵ��� 

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

function drawEllipse(centerX, centerY, width, height) {	//�ܼ��� �׸��� �׸��� �Լ�

  context.beginPath();
  
  context.moveTo(centerX, centerY - height/2);	//������ ��ġ������ ���� �̵�
  
  /*
  3�� ������ ��� �׸� (XX, YY, XX2, YY2, x, y)
  (XX, YY)�� (XX2, YY2)�� ������ �������� ����Ͽ�, (x, y)��ǥ�� �־��� ���� ����
  ���� ������ ��� �׸�
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

function updateBreath() {	//ȣ�� ���� �Լ�
				
  if (breathDir === 1) {  // breath in
	breathAmt -= breathInc;	//ȣ���� �ѷ��� ���������� -���� ����
	if (breathAmt < -breathMax) {	//ȣ���� �ѷ��� ������ MAX������ �۾����� breathDir = -1�� �����Ͽ� ���� ����
	  breathDir = -1;
	}
  }
   else {  // breath out
	breathAmt += breathInc;	//ȣ���� �ѷ��� ���������� +���� ����
	if(breathAmt > breathMax) {	//ȣ���� �ѷ��� ������ MAX������ Ŀ���� breathDir = +1�� �����Ͽ� ��� ����
	  breathDir = 1;
	}
  }
}

function updateBlink() { 
            
  eyeOpenTime += blinkUpdateTime; //0.2�� ���� �� �� �ð��� ������
   
  if(eyeOpenTime >= timeBtwBlinks){ //�� �߰� �ִ� �ð��� 4�ʸ� �Ѿ�� �� ������.
   blink();
  }
}

function blink() {

  curEyeHeight -= 1; //14���� 1�� �Ԥ��¤�
  if (curEyeHeight <= 0) { //���� ���̰� 0���ϸ�
   eyeOpenTime = 0; //�� �� �ð��� 0�ʷ� �ʱ�ȭ
   curEyeHeight = maxEyeHeight; //���� ���̸� �ٽ� 14�� ����
  } else {
   setTimeout(blink, 10); //���� ���̰� 0���� ũ�� 0.01�� �������� blink ȣ��
  }
}