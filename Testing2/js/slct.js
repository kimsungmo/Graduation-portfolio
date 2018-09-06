var workout="미선택";
var sets="미선택";
var reps="미선택";
var weight="미선택";
var rest_time=10;

function confirm(){
	//workout = $("input[name=workout]:checked").val();
	workout = $("input[name=workout]:checked").data("wo");
	sets = $("#sets").val();
	reps = $("#reps").val();
	weight = $("#weights").val();
	rest_time=$("#rest_time option:selected").val();
	document.getElementById("prnt").innerHTML=workout+": "+"세트: "+sets+"반복: "+reps+"무게: "+weight+"쉬는 시간: "+rest_time+"초";
}