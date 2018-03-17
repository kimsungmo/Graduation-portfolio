var workout;
var sets;
var reps;
var weight;

function confirm(){
	workout = $("input[name=workout]:checked").val();
	sets = document.getElementById("sets").value;
	reps = document.getElementById("reps").value;
	weight = document.getElementById("weight").value;
	document.getElementById("prnt").innerHTML = 
	workout + "<br/>" +
	"세트: "+sets+"반복: "+reps+"무게: "+weight;
}

function show(){
	/*
	닉네임을 바탕으로 개인 정보와 운동 설정, 실제 수행한 횟수 DB에 저장해야 함.
	 */
	document.getElementById("prnt").innerHTML = 
		workout + "<br/>" +
		"나의 목표 : "+" 세트: "+sets+" 반복: "+reps+" 무게: "+weight;
}