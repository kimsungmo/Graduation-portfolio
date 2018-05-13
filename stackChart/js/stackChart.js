'use strict';
window.chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};
function updateCurrOrrTxt() { //그래프를 가로로 출력.
	  document.getElementById("currentOrientation").innerHTML = screen.orientation;
	  console.log(screen.orientation);
	}
var barChartData = { //data 배열의 각 열이 하나의 운동 종목이 되고 data 배열 자체는 운동한 날이 된다.
	labels: ['January', 'February', 'March'/*, 'April', 'May', 'June', 'July'*/],
	datasets: [{
		label: '운동종목 1',
		backgroundColor: window.chartColors.red,
		data: [
			10,20,80
		]
	}, {
		label: '운동종목 2',
		backgroundColor: window.chartColors.blue,
		data: [
			43,90,15
		]
	}, {
		label: '운동종목 3',
			backgroundColor: window.chartColors.green,
			data: [
				110,68,79
			]
		}]
	};
window.onload = function() {
	var ctx = document.getElementById('canvas').getContext('2d');
	window.myBar = new Chart(ctx, {
		type: 'bar',
		data: barChartData,
		options: {
			title: {
				display: true,
				text: 'Chart - Stacked'
			},
			tooltips: {
				mode: 'index',
				intersect: false
			},
			responsive: true,
			scales: {
				xAxes: [{
					stacked: true,
				}],
				yAxes: [{
					stacked: true
				}]
			}
		}
	});
	//화면을 가로로
	  screen.lockOrientation("landscape-primary");
	  
	  // Clicking this button can have no visual effect (depending on the browser)
	  document.getElementById("unlock-orientation").onclick = function() {
	    screen.unlockOrientation();
	  };
};
		/*document.getElementById('randomizeData').addEventListener('click', function() {
			barChartData.datasets.forEach(function(dataset) {
				dataset.data = dataset.data.map(function() {
					return randomScalingFactor();
				});
			});
			window.myBar.update();
		});*/