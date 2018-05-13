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
/*
(function(global) {
	var Months = [
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

	var COLORS = [
		'#4dc9f6',
		'#f67019',
		'#f53794',
		'#537bc4',
		'#acc236',
		'#166a8f',
		'#00a950',
		'#58595b',
		'#8549ba'
	];

	var Samples = global.Samples || (global.Samples = {});
	var Color = global.Color;

	Samples.utils = {
		// Adapted from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
		srand: function(seed) {
			this._seed = seed;
		},

		rand: function(min, max) {
			var seed = this._seed;
			min = min === undefined ? 0 : min;
			max = max === undefined ? 1 : max;
			this._seed = (seed * 9301 + 49297) % 233280;
			return min + (this._seed / 233280) * (max - min);
		},

		numbers: function(config) {
			var cfg = config || {};
			var min = cfg.min || 0;
			var max = cfg.max || 1;
			var from = cfg.from || [];
			var count = cfg.count || 8;
			var decimals = cfg.decimals || 8;
			var continuity = cfg.continuity || 1;
			var dfactor = Math.pow(10, decimals) || 0;
			var data = [];
			var i, value;

			for (i = 0; i < count; ++i) {
				value = (from[i] || 0) + this.rand(min, max);
				if (this.rand() <= continuity) {
					data.push(Math.round(dfactor * value) / dfactor);
				} else {
					data.push(null);
				}
			}

			return data;
		},

		labels: function(config) {
			var cfg = config || {};
			var min = cfg.min || 0;
			var max = cfg.max || 100;
			var count = cfg.count || 8;
			var step = (max - min) / count;
			var decimals = cfg.decimals || 8;
			var dfactor = Math.pow(10, decimals) || 0;
			var prefix = cfg.prefix || '';
			var values = [];
			var i;

			for (i = min; i < max; i += step) {
				values.push(prefix + Math.round(dfactor * i) / dfactor);
			}

			return values;
		},

		months: function(config) {
			var cfg = config || {};
			var count = cfg.count || 12;
			var section = cfg.section;
			var values = [];
			var i, value;

			for (i = 0; i < count; ++i) {
				value = Months[Math.ceil(i) % 12];
				values.push(value.substring(0, section));
			}

			return values;
		},

		color: function(index) {
			return COLORS[index % COLORS.length];
		},

		transparentize: function(color, opacity) {
			var alpha = opacity === undefined ? 0.5 : 1 - opacity;
			return Color(color).alpha(alpha).rgbString();
		}
	};

	// DEPRECATED
	window.randomScalingFactor = function() {
		return Math.round(Samples.utils.rand(-100, 100));
	};

	// INITIALIZATION

	Samples.utils.srand(Date.now());

	// Google Analytics
	//eslint-disable
	if (document.location.hostname.match(/^(www\.)?chartjs\.org$/)) {
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		ga('create', 'UA-28909194-3', 'auto');
		ga('send', 'pageview');
	}
	// eslint-enable

}(this));*/
//////////////////////////////////////////////////////////////
//var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var color = Chart.helpers.color;
var barChartData = { //이 부분이 실제 차트에 들어가는 데이터
	labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
	datasets: [{
		label: 'Dataset 1',
		backgroundColor: color(window.chartColors.orange).alpha(0.5).rgbString(),
		borderColor: window.chartColors.orange,
		borderWidth: 1,
		data: [ //Get datas from server DB
		    10,10,10,10,10,10,10,
		    10,10,10,10,10,10,10,
		    10,10,10,10,10,10,10,
		    10,10,10,10,10,10,10,
		    10,10,10
			/*randomScalingFactor(),
			randomScalingFactor(),
			randomScalingFactor(),
			randomScalingFactor(),
			randomScalingFactor(),
			randomScalingFactor(),
			randomScalingFactor()*/
		]
	}/*, {
		label: 'Dataset 2',
		backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
		borderColor: window.chartColors.blue,
		borderWidth: 1,
		data: [
			randomScalingFactor(),
			randomScalingFactor(),
			randomScalingFactor(),
			randomScalingFactor(),
			randomScalingFactor(),
			randomScalingFactor(),
			randomScalingFactor()
		]
	}*/]

};

window.onload = function() {
	document.addEventListener('tizenhwkey', function(e) {
        if (e.keyName === "back") {
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (ignore) {}
        }
    });
	
	var ctx = document.getElementById('canvas').getContext('2d');
	window.myBar = new Chart(ctx, {
		type: 'bar',
		data: barChartData,
		options: {
			responsive: true,
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				text: 'Bar Chart for date records'
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
/*
document.getElementById('randomizeData').addEventListener('click', function() {
	var zero = Math.random() < 0.2 ? true : false;
	barChartData.datasets.forEach(function(dataset) {
		dataset.data = dataset.data.map(function() {
			return zero ? 0.0 : randomScalingFactor();
		});

	});
	window.myBar.update();
});

var colorNames = Object.keys(window.chartColors);
document.getElementById('addDataset').addEventListener('click', function() {
	var colorName = colorNames[barChartData.datasets.length % colorNames.length];
	var dsColor = window.chartColors[colorName];
	var newDataset = {
		label: 'Dataset ' + barChartData.datasets.length,
		backgroundColor: color(dsColor).alpha(0.5).rgbString(),
		borderColor: dsColor,
		borderWidth: 1,
		data: []
	};

	for (var index = 0; index < barChartData.labels.length; ++index) {
		newDataset.data.push(randomScalingFactor());
	}

	barChartData.datasets.push(newDataset);
	window.myBar.update();
});


document.getElementById('addData').addEventListener('click', function() {
	if (barChartData.datasets.length > 0) {
		var month = MONTHS[barChartData.labels.length % MONTHS.length];
		barChartData.labels.push(month);

		for (var index = 0; index < barChartData.datasets.length; ++index) {
			// window.myBar.addData(randomScalingFactor(), index);
			barChartData.datasets[index].data.push(randomScalingFactor());
		}

		window.myBar.update();
	}
});

document.getElementById('removeDataset').addEventListener('click', function() {
	barChartData.datasets.splice(0, 1);
	window.myBar.update();
});

document.getElementById('removeData').addEventListener('click', function() {
	barChartData.labels.splice(-1, 1); // remove the label first

	barChartData.datasets.forEach(function(dataset) {
		dataset.data.pop();
	});

	window.myBar.update();
});*/