'use strict';

(function(global) {
/*	var Months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
*/
	var barChartData = {
			labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
			datasets: [] //날짜 선택 시 서버에서 데이터 가져옴
	};
	window.onload = function() {
		var ctx = document.getElementById('canvas').getContext('2d');
		window.myBar = new Chart(ctx, {
			type: 'bar',
			data: barChartData,
			options: {
				title: {
					display: true,
					text: 'Chart.js Bar Chart - Stacked'
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
	};
	var i=0;
	var c = [
		'rgb(255, 99, 132)', //red
		'rgb(255, 159, 64)', //orange
		'rgb(255, 205, 86)', //yellow
		'rgb(75, 192, 192)', //green
		'rgb(54, 162, 235)', //blue
		'rgb(153, 102, 255)', //purple
		'rgb(201, 203, 207)' //grey
	];

	document.getElementById('adddataset').addEventListener('click', function() { //이걸 날짜 select로 변경
		if (i==7) i=0;
		var newDataset = {
			labels: 'Dataset ' +	 barChartData.datasets.length,
			backgroundColor : c[i],
			//data : 각 열은 1일 2일 3일 ... 29일 30일 
			data: [10,50,50,50,50,50,50]
		};
		i+=1;
		for (var index = 0; index < barChartData.labels.length; ++index) {
			newDataset.data.push(55);
		}
		barChartData.datasets.push(newDataset);
		window.myBar.update();
	});
}(this));
