( function () {
    window.addEventListener('tizenhwkey', function( ev ) {
        if( ev.keyName === "back" ) {
        	console.log('back!1');
            var page = document.getElementsByClassName( 'ui-page' )[0];
            console.log('page:'+page);
            var pageid = page ? page.id : "";
            var pageid=page.id;
            console.log(pageid);
            screen.lockOrientation("portrait-primary");
            console.log('back!2');
            if( pageid === "mainpageList" /*&& !activePopup*/) { //로그인화면에서 끄기?
            	console.log('back!3');
            	try {
            		console.log('back!4');
	                tizen.application.getCurrentApplication().exit();
	            } catch (ignore) {
	            }
            }else if(window.history.length!=0){
            	console.log(window.history);
            	console.log(window.history.length);
            	console.log('back5');
                window.history.back();
                console.log('back6');
            }
        }
    } );
} () );