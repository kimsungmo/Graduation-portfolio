( function () {
    window.addEventListener( 'tizenhwkey', function( ev ) {
        if( ev.keyName === "back" ) {
            var activePopup = document.querySelector( '.ui-popup-active' ),
                page = document.getElementsByClassName( 'ui-page-active' )[0],
                pageid = page ? page.id : "";
            screen.lockOrientation("portrait-primary");
            if( pageid === "one" && !activePopup) { //로그인화면에서 끄기?
				/*var exit = confirm("exit");
				if(exit){
					tizen.application.getCurrentApplication().exit();
				}*/
	        	try {
	                tizen.application.getCurrentApplication().exit();
	            } catch (ignore) {
	            }
        
            } else {
                window.history.back();
            }
        }
    } );
} () );