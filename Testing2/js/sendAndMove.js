$(function(){
	var btn = $('#toBlueHtml');
	btn.click(function(){
		var workout=$('input[name="workout"]:checked').val();
		var name=$('input[name="workout"]:checked').data("wo");
		var sets=$('#sets').val();
		var reps=$('#reps').val();
		var weights=$('#weights').val();
		var rest_time=$('#rest_time option:selected').val();
		$.ajax({
			type:'post',
			dataType:'json',
			url:'http://115.68.232.116/records/setting.php',
			data:{
				workout:workout,
				sets:sets,
				reps:reps,
				weights:weights,
				rest_time:rest_time
			},
			success:function(json){
				if(json.res=='good'){
					location.replace('workout.html');
					//blue.html이라는 문서를 열고 키:값을 넘겨준다.
					window.open("workout.html?workout:"+name+"&sets:"+sets+"&reps:"+reps+"&weights:"+weights+"&rest_time:"+rest_time);
				}else{
					alert('DB 서버 오류');
				}
			},
			error:function(){
				alert('error');
				console.log('error workout.html');
			}
		})
	});
});

/*
( function () {
	alert('goto Blue');
	$('#toBlueHtml').on('click',function(){
		//setTimeout(toBlue,1000);
		//location.replace("index.html");
		tau.changePage('blue.html');
	});
} () );*/
	
/*
function toBlue(){
	//tau.changePage('blue.html',{transition:'slide'});
	//$("#toBlue").click();
	location.replace("index.html");
}
$('#toBlueHtml').on('click',function(){
	//setTimeout(toBlue,1000);
	//delay(1000);
	location.replace("index.html");
});
*/