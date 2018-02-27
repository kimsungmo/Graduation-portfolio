
//사용자가 입력한 설정 값 출력
var printing = function (){
		var workout=$("input[type=radio][name=workout]:checked").val();
		var userset=document.getElementsByClassName("setting");
		document.getElementById("wo").innerHTML=workout;
		document.getElementById("st").innerHTML=userset[0].value;
		document.getElementById("rp").innerHTML=userset[1].value;
		document.getElementById("we").innerHTML=userset[2].value;
}