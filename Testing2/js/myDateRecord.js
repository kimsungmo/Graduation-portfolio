'use strict';

$(function(){
	var year,month,day,r,i,j;
	$.stack=function(){
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
				}else if(result.notnull!=true){//빈 데이터
					alert('결과 값이 없습니다.');
					var ctx = document.getElementById('canvas').getContext('2d');//chart 그리기 위한 canvas
					window.myBar = new Chart(ctx, {
						type: 'bar',
						data: {},//barChartData,//위에서 설정한 object
						options: {
							title: {
								display: true,
								text: '월별 운동 기록'
							},
							tooltips: {//Print info during hover
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
					var newDataset = {
						label: [],//운동 각각 하나
						backgroundColor : [],//색깔 변하게
						data: [] //날짜마다 수행한 운동 값, 운동 안했으면 0
					};
					barChartData.datasets.push(newDataset);
					window.myBar.update();//chart 갱신
				}else{
					r=result;
					i=0,j=0;
					var days=[];
					var uniquedays=[];
					var color=[];
					var workouts=[];
					var uniqueworkouts=[];
					var done=[];
					var c = ['rgb(255, 99, 132)', //red
						'rgb(255, 159, 64)', //orange
						'rgb(255, 205, 86)', //yellow
						'rgb(75, 192, 192)', //green
						'rgb(54, 162, 235)', //blue
						'rgb(153, 102, 255)', //purple
						'rgb(201, 203, 207)' //grey
					];
					while(result[i]){//서버에서 가져온 data를 알맞게 배열에 넣음
						days.push(result[i][7]);
						workouts.push(result[i][0]);
						done.push(parseInt(result[i][1]) * parseInt(result[i][2]) * parseInt(result[i][3]));
						color.push(c[i]);
						i+=1;
					}
					$.each(workouts,function(i,el){
						if($.inArray(el,uniqueworkouts)===-1)uniqueworkouts.push(el);
					});
					$.each(days,function(i,el){
						if($.inArray(el,uniquedays)===-1)uniquedays.push(el);//배열 내에 el과 일치하는 값을 찾지 못하면 uniquedays에 날짜 삽입
					});
					var thirtyone=[];
					for(i=0;i<31;i++){
						thirtyone.push(i+1);
					}
					var barChartData = {//Schema for bar chart.
						labels:thirtyone,
						datasets:[
						]
					};
					var ctx = document.getElementById('canvas').getContext('2d');//chart 그리기 위한 canvas
					window.myBar = new Chart(ctx, {
						type: 'bar',
						data: barChartData,//위에서 설정한 object
						options: {
							title: {
								display: true,
								text: '월별 운동 기록(세트 기준)'
							},
							tooltips: {//Print info during hover
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
					var worksets=[];
					var k;
					while(w=uniqueworkouts[i]){//운동 하나 선택
						j=0;
						workset=[]; //운동 값
						for(k=0;k<31;k++){
							workset[k]=0;
						}
						while(result[j]){ //운동 기록 탐색
							if(w==result[j][0]){//운동이 같다면
								workset[result[j][7]-1]+=parseInt(result[j][1]);//차트상 day에 set 넣기
							}
							j+=1;
						}
						var newDataset = {
							label: uniqueworkouts[i],//운동 각각 하나
							backgroundColor : color[i],//색깔 변하게
							data: workset //날짜마다 수행한 운동 값, 운동 안했으면 0
						};
						barChartData.datasets.push(newDataset);
						i+=1;
					}
					window.myBar.update();//chart 갱신
				}
			},
			error : function(xhr,status,error){
				alert(error);
			}
		})
	}
	$.doughnut=function(){
		var result=[];
		var arr=[];
		var arr2=[];
		var i=0;
		var back_color = ["#F7464A","#46BFBD","#FDB45C","#E92B9E","#5FD3E8","#4861E8"];//일단 색 6개만..
		var bc = [];
		day = $("#day").val();
		i=0;
		while(r[i]){
			if(day==r[i][7]){//사용자가 선택한 날짜와 일치하는 데이터를 result에 넣기
				result[i]=r[i];
			}
			i+=1;
		}
		for(var j=0;j<i;j++){
			if(result[j]!=null || result[j]!=undefined){
			arr.push(parseInt(result[j][1])*parseInt(result[j][2])*parseInt(result[j][3])*0.01);
			arr2.push(String(result[j][0])+': '+String(result[j][1])+'세트 '+String(result[j][2])+'회 '+String(result[j][3])+'kg'
					+'시작'+String(result[j][4])+'종료'+String(result[j][5])+'운동시간'+String(result[j][6])+'환산 점수 ');
			}
		}
		var j=0;
		while(j<i){
			bc.push(back_color[j]);//bc 배열에 색깔 집어 넣기
			j+=1;
		}
		var config = {
	        type: 'pie',
	        data: {
	            datasets: [{
	                data: arr,//그래프 그릴 때 쓰는 실제 값
	                backgroundColor: bc,
	                label: 'Dataset 1'
	            },
	            ],
	            labels: //운동 종목,세트,반복 횟수,무게 등의 정보
	            	arr2
	        },
	        options: {
	            responsive: true,
	            legend: {
	                position: "top",
	            },
	            title: {
	                display: true,
	                text:day+"기록"
	            }
	        }
	    };
		var ctx = document.getElementById("mychart").getContext("2d");
        window.myDoughnut = new Chart(ctx, config);		
	}
	screen.lockOrientation("landscape-primary");
});