'use strict';

$.showTable = function(){
	var year,month,workout,i=0;
	year = $("#yearselect").val();
	month = $("#monthselect").val();
	workout = $("#workoutselect").val();
	alert(year,month,workout);
	$.ajax({
		type:'post',
		dataType:'json',
		url:'http://115.68.232.116/records/monthrank.php',
		data:{
			year:year,
			month:month,
			workout:workout
		},
		success:function(result){
			if(result.success == false){
				alert(result.msg);
				return;
			}
			var tbl=""
			tbl+='<table border=1><tr><th>Rank</th><th>Nickname</th><th>Sets</th><th>Reps</th><th>Weight</th><th>Point</th><th>Date</th></tr>';
				while(result[i]){		
					tbl+='<tr><td>'+result[i][0]+'</td><td>'+result[i][1]+'</td><td>'+result[i][3]+'</td><td>'+result[i][4]+'</td><td>'
					+result[i][5]+'</td><td>'+result[i][6]+'</td><td>'+result[i][7];
					i+=1;
				}
				tbl+='</table>'
				document.getElementById("tbl").innerHTML=tbl;
		},
		error:function(xhr,status,erre){
			alert(error);
		}
	})
	//화면을 가로로
	screen.lockOrientation("landscape-primary");
}