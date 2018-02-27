/*window.onload = function() {
    // TODO:: Do your initialization job

    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if (e.keyName === "back") {
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (ignore) {}
        }
    });
};*/

var init=function(){
	var worksetting=document.getElementById("worksetting");
	tau.event.on(worksetting, "tap", function(event){
	tau.changePage("#worksettingpage");   	
	});
	var searchingdumbbell=document.getElementById("searchingdumbbell");
	tau.event.on(searchingdumbbell, "tap", function(event){
	tau.changePage("#dumbbellconn");   	
	});
	var start=document.getElementById("workoutstart");
	tau.event.on(start, "tap", function(event){
	tau.changePage("#start");   	
	});
	var start=document.getElementById("myrecord");
	tau.event.on(start, "tap", function(event){
	tau.changePage("#myrec");   	
	});
	var start=document.getElementById("ranking");
	tau.event.on(start, "tap", function(event){
	tau.changePage("#rank");   	
	});
}

$(document).bind( 'pageinit', init );
