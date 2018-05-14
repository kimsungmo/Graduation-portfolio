'use strict';

/*window.chartColors = {
	red: 'rgb(255, 99, 132)', //red
	orange: 'rgb(255, 159, 64)', //orange
	yellow: 'rgb(255, 205, 86)', //yellow
	green: 'rgb(75, 192, 192)', //green
	blue: 'rgb(54, 162, 235)', //blue
	purple: 'rgb(153, 102, 255)', //purple
	grey: 'rgb(201, 203, 207)' //grey
};
window.chartColors = {
	'0': 'rgb(255, 99, 132)', //red
	'1': 'rgb(255, 159, 64)', //orange
	'2': 'rgb(255, 205, 86)', //yellow
	'3': 'rgb(75, 192, 192)', //green
	'4': 'rgb(54, 162, 235)', //blue
	'5': 'rgb(153, 102, 255)', //purple
	'6': 'rgb(201, 203, 207)' //grey
};
*/
var c = [
	'rgb(255, 99, 132)', //red
	'rgb(255, 159, 64)', //orange
	'rgb(255, 205, 86)', //yellow
	'rgb(75, 192, 192)', //green
	'rgb(54, 162, 235)', //blue
	'rgb(153, 102, 255)', //purple
	'rgb(201, 203, 207)' //grey
];

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
	/* eslint-disable */
	if (document.location.hostname.match(/^(www\.)?chartjs\.org$/)) {
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		ga('create', 'UA-28909194-3', 'auto');
		ga('send', 'pageview');
	}
	/* eslint-enable */
/////////////////////
var barChartData = {
			labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
			datasets: [{
				label: 'Dataset 1',
				backgroundColor: window.chartColors.red,
				data: [
					-100,
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor()
				]
			}, {
				label: 'Dataset 2',
				backgroundColor: window.chartColors.blue,
				data: [
					0,
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor()
				]
			}, {
				label: 'Dataset 3',
				backgroundColor: window.chartColors.green,
				data: [
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor()
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

	document.getElementById('randomizeData').addEventListener('click', function() {
		barChartData.datasets.forEach(function(dataset) {
			dataset.data = dataset.data.map(function() {
				return randomScalingFactor();
			});
		});
		window.myBar.update();
	});
	///////////////////
var i=0;
document.getElementById('adddataset').addEventListener('click', function() {
//	var colorName = colorNames[barChartData.datasets.length % colorNames.length];
//	var dsColor = window.chartColors[colorName];
if (i==7) i=0;
	var newDataset = {
		labels: 'Dataset ' +	 barChartData.datasets.length,
		//backgroundColor: window.chartColors.a,
		backgroundColor : c[i],
		//borderColor: dsColor,
		//borderWidth: 1,
		//data : 각 열은 1일 2일 3일 ... 29일 30일 
		data: [randomScalingFactor(),50,50,50,50,50,50]
	};
i+=1;
	for (var index = 0; index < barChartData.labels.length; ++index) {
		newDataset.data.push(55);
	}

	barChartData.datasets.push(newDataset);
	window.myBar.update();
});
}(this));

