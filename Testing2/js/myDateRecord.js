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
				}
				r=result;
				i=0,j=0;
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
				for(i=0;i<31;i++){
					thirtyone.push(i+1);
				}
				var barChartData = {
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
						text: '월별 운동 기록'
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
						}else{
							workset.push(result[j][1]);//세트 저장
						}
					}	
					j+=1;
				}
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
			if(day==r[i][7]){
				j=0;
				result[i]=r[i];
				while(j<8){
					//alert(result[i][j]);
					j+=1;
				}
			}
			i+=1;
		}
		i=0;
		while(result[i]){ //result의 끝까지 돌면서 arr 배열에 운동 포인트 계산한 값 넣기
			arr.push(parseInt(result[i][1]) * parseInt(result[i][2]));
			i+=1;
		}
		i=0;
		while(result[i]){//arr2 배열에 값을 넣음
			arr2.push(String(result[i][0])+': '+String(result[i][1])+'세트 '+String(result[i][2])+'회 '+String(result[i][3])+'kg'
				+'\n'+'시작시간'+String(result[i][4])+'종료시간'+String(result[i][5])+'운동시간'+String(result[i][6])+'환산 점수 ');
			i+=1;
		}
		alert(arr+'   '+arr2);//36,48
		var j=i; //존재하는 운동의 갯수만큼 (?) 맞는지는 잘 모르겠음
		while(j>0){
			bc.push(back_color[j-1]);//bc 배열에 색깔 집어 넣기
			j-=1;
		}
		var config = {
	        type: 'pie',
	        data: {
	            datasets: [{
	                data: arr,
	                backgroundColor: bc,
	                label: 'Dataset 1'
	            },
	            ],
	            labels: //운동 종목 , 세트, 반복 횟수, 무게
	                      arr2
	        },
	        options: {
	            responsive: true,
	            legend: {
	                position: "top",
	            },
	            title: {
	                display: true,
	                text: "님의 기록"
	            }
	        }
	    };
		var ctx = document.getElementById("mychart").getContext("2d");
        window.myDoughnut = new Chart(ctx, config);		
	}
	//화면을 가로로
	screen.lockOrientation("landscape-primary");
});