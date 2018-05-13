$(function(){
    var user_id = 'AAA123';
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: 'http://115.68.232.116/records/myChart2.php', //doDumbbells DB에 접근해서 ID에 맞는 정보 검색
        data:{
        	user_id : user_id
		},
		success	: function(result) {
			if(result.success == false) {
				alert(result.msg);
				return;
			}
			var arr=[];
			var arr2=[];
			var i=0;
			var back_color = ["#F7464A","#46BFBD","#FDB45C","#E92B9E","#5FD3E8","#4861E8"];//일단 색 6개만..
			var bc = [];
			while(result[i]){ //result의 끝까지 돌면서 arr 배열에 운동 포인트 계산한 값 넣기
				arr.push(parseInt(result[i][1]) * parseInt(result[i][2]));
				i+=1;
			}
			alert(result[0][0]+' '+result[0][1]+' '+result[0][3]
				+' '+result[1][0]+' '+result[1][1]+' '+result[1][3]
				+' '+result[2][0]+' '+result[2][1]+' '+result[2][3]
				/*+' '+result[3][0]
				+' '+result[5][0]*/
			);
			i=0;
			while(result[i]){//arr2 배열에 값을 넣음
				arr2.push(String(result[i][0])+': '+String(result[i][1])+'세트 '+String(result[i][2])+'회 '+String(result[i][3])+'kg '+'환산 점수 ');
				i+=1;
			}
			alert(arr);//36,48
			/*i=0;
			while(result[i]){//arr2 배열에 값을 넣음
				arr2.push(String(result[i][0])+': '+String(result[i][1])+'세트 '+String(result[i][2])+'회 '+String(result[i][3])+'kg '+'환산 점수 ');
				i+=1;
			}*/
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
			                text: user_id + "님의 기록"
			            }
			        }
			    };
			var ctx = document.getElementById("mychart").getContext("2d");
	        window.myDoughnut = new Chart(ctx, config);			
		},
		error : function(xhr,status,erre){
			alert(error);
		}
    })
});