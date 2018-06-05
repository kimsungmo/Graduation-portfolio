( function () {
    window.addEventListener( 'tizenhwkey', function( ev ) {
        if( ev.keyName === "back" ) {
        	location.replace("index.html");
        	//window.location="index.html";
        }
    } );
} () );