'use strict';

$(function(){
	var year,month;
	$("#ym").click(function(){
		year = $("#yearselect").val();
		month = $("#monthselect").val();
		$.ajax({
	        type: 'post',
	        dataType: 'json',
	        url: 'http://115.68.232.116/records/stackBar.php', //doDumbbells DB에 접근해서 ID에 맞는 정보 검색
	        data:{
	        	year : year,
	        	month : month
			},
			success	: function(result) {
				if(result.success == false) {
					alert(result.msg);
					return;
				}
				var i=0,j=0;
				var days=[];
				var uniquedays=[];
				var color=[];
				var workouts=[];
				var done=[];
				var c = ['rgb(255, 99, 132)', //red
					'rgb(255, 159, 64)', //orange
					'rgb(255, 205, 86)', //yellow
					'rgb(75, 192, 192)', //green
					'rgb(54, 162, 235)', //blue
					'rgb(153, 102, 255)', //purple
					'rgb(201, 203, 207)' //grey
				];
				while(result[i]){
					days.push(result[i][7]);
					workouts.push(result[i][0]);
					done.push(parseInt(result[i][1]) * parseInt(result[i][2]) * parseInt(result[i][3]));
					color.push(c[i]);
					i+=1;
				}
				$.each(days,function(i,el){
					if($.inArray(el,uniquedays)===-1)uniquedays.push(el);
				});
				var thirtyone=[];
				for(i=1;i<=31;i++){
					thirtyone.push(i);
				}
				var barChartData = {
					//labels: [], //서버로부터 날짜를 뽑아 배열에 저장
					labels:thirtyone,
					datasets:[
					]
				};

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

			i=0;
			var d;
			var w;
			var count=0;
			var workset=[];
			var workval=[];
			var k;
			while(w=workouts[i]){//운동 하나 선택
				j=0;
				workset=[]; //운동 값
				while(result[j]){ //전체 탐색
					if(w==result[j][0]){//운동 같음
						count=0;
						for(k=1;k<=31;k++){
							if(k==result[j][7]){
								workset.push(result[j][1]);
							}else{
								workset.push(0);
							}
						}
						if(count==0){
							workset.push(0);
							alert('count = 0 : ' + workset);
						}else{
							workset.push(result[j][1]);//세트 저장
							alert('count != 0 : ' + workset);
						}
					}	
					j+=1;
				}
				alert('workset'+' '+workset);
				//workval.push(workset);
				var newDataset = {
						label: [workouts[i]],//운동 각각 하나
						backgroundColor : color[i],//색깔 변하게
						data: workset //날짜마다 수행한 운동 값, 운동 안했으면 0
					};
					barChartData.datasets.push(newDataset);
					window.myBar.update();
				i+=1;
			}
		},
			error : function(xhr,status,erre){
				alert(error);
			}
	    })
	});
});