window.onload=function(){
	$('#logout').click(function(){
		var re=confirm('로그아웃 하시겠습니까?');
		if(re==true){
			//disconnect session of server.
			location.replace('signIn.html');
		}
	});
}