//'use strict';

$(function(){
	$.rank=function(){
		var year,month,workout,i=0;
		year = $("#yearselect").val();
		month = $("#monthselect").val();
		workout = $("#workoutselect").val();
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
				tbl+='<table border=1 class="table"><thead class="thead-dark"><tr><th>Rank</th><th>Nickname</th><th>Sets</th><th>Reps</th><th>Weight</th><th>Point</th><th>Date</th></tr></thead>';
					while(result[i]){
						tbl+='<tr><td>'+result[i][0]+'</td><td>'+result[i][1]+'</td><td>'+result[i][3]+'</td><td>'+result[i][4]+'</td><td>'
						+result[i][5]+'</td><td>'+result[i][6]+'</td><td>'+result[i][7];
						i+=1;
					}
					tbl+='</table>'
					document.getElementById("tbl").innerHTML=tbl;
			},
			error:function (jqXHR, exception) {
		        var msg = '';
		        if (jqXHR.status === 0) {
		            msg = 'Not connect.\n Verify Network.';
		        } else if (jqXHR.status == 404) {
		            msg = 'Requested page not found. [404]';
		        } else if (jqXHR.status == 500) {
		            msg = 'Internal Server Error [500].';
		        } else if (exception === 'parsererror') {
		            msg = 'Requested JSON parse failed.';
		        } else if (exception === 'timeout') {
		            msg = 'Time out error.';
		        } else if (exception === 'abort') {
		            msg = 'Ajax request aborted.';
		        } else {
		            msg = 'Uncaught Error.\n' + jqXHR.responseText;
		        }
		        alert('msg:'+msg);
		    }			
		})
	}
	//화면을 가로로
	setTimeout(function(){
		screen.lockOrientation("landscape-primary");
	}, 2000);
})