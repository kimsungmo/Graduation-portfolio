window.onload=function(){	
	document.addEventListener('tizenhwkey', function(ev){
    	if(ev.keyName==='back'){//confirm when user click back key
    		screen.lockOrientation("portrait-primary");
    		setTimeout(function(){
    			location.replace('selection.html');
    		},1000);
    		//location.replace('selection.html');
    	}
	});
}