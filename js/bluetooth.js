//var backEventListener = null;
var adapter = tizen.bluetooth.getDefaultAdapter(); //1번

/*
adapter.registerRFCOMMServiceByUUID(serviceUUID, 'My service'); //블루투스 디바이스와 연결하고 데이터 주고 받기
device.connectToServiceByUUID(serviceUUID, function(sock) {
    console.log('socket connected');
    socket = sock;
}, function(error) {
    console.log('Error while connecting: ' + error.message);
});

onBondingSuccessCallback = function (device) { //블루투스 디바이스와 본딩 생성
console.log('A bond is created - name: ' + device.name);
}
onErrorCallback = function (e) {
console.log('Cannot create a bond, reason: ' + e.message);
}
adapter.createBonding('98:D3:35:70:C3:56', onBondingSuccessCallback, onErrorCallback);
//Initialize function
*/
/*
var unregister = function() { //뒤로가기
    if ( backEventListener !== null ) {
        document.removeEventListener( 'tizenhwkey', backEventListener );
        backEventListener = null;
        window.tizen.application.getCurrentApplication().exit();
    }
}*/
( function () {
    window.addEventListener( 'tizenhwkey', function( ev ) {
        if( ev.keyName === "back" ) {
            var activePopup = document.querySelector( '.ui-popup-active' ),
                page = document.getElementsByClassName( 'ui-page-active' )[0],
                pageid = page ? page.id : "";

            if( pageid === "main" && !activePopup ) {
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

var listDeviceElement;
var listDevice;

var cancelDiscovery = function() {
   adapter.stopDiscovery(function() {
       console.log("Stop discovery success.");
   },
   function (e) {
       console.log("Error while stopDiscovery:" + e.message);
   });
}

var startDiscovery = function() {
	var discoverDevicesSuccessCallback = {
        onstarted: function() {
             console.log ("찾기시작") ; //5번
        },
        ondevicefound: function(device) { //찾은 디바이스
             listDevice.addItem("<li devicename='" + device.name + "' deviceaddress='" + device.address + "' >Name: " + device.name + ", Address: " + device.address + "</li>");
             listDevice.refresh();
             cancelDiscovery();
        },
        ondevicedisappeared: function(address) {
        },
        onfinished: function(devices) {
        }
     };

     // 소캣찾기
     adapter.discoverDevices(discoverDevicesSuccessCallback, function(e) {//4번
    	 alert("디바이스를 찾을 수 없습니다.")
     });
}

var onSetPoweredError = function(e) { //3번
	/*alert(e.message);*/
	alert('전원설정에러 발생');
}
var onSocketError = function(err){
	console.log(err);
	//alert(err.name);
	//alert('소켓에러 발생');
}
var reps; //사용자가 세트 종료 버튼을 누르거나(이벤트) 세트를 마치면(자동) count 값과 함께 운동 종류, 세트 수, 반복 수, 날짜 등을 DB서버 php로 보내고 sql문으로 저장..
 //조회버튼 누르면 php select문으로 서버 자체에서 만든 페이지에 db 출력..?? 
var onSocketConnected = function(socket) {
    console.log ("소켓이 연결되었습니다");
    alert('소켓이 연결되었습니다!');
    socket.onmessage = function () {
       //document.getElementById("divReceiveData").innerHTML = socket.readData()+"<br/>"+
       document.getElementById("divReceiveData").innerHTML=socket.readData();
      // reps = getElementById("divReceiveData");
       //count = parseInt(socket.readData());
    	  //String.fromCharCode.apply(String, socket.readData()) + "<br/>" + 
    	  //document.getElementById("divReceiveData").innerHTML;
       
    	  //alert(count);
       
    };
    socket.onclose = function() {
       alert("연결이 종료되었습니다. " + socket.peer.name);
    };

    // Sends data to peer.
    /*tau.event.on (document.getElementById("btnSendData"),"tap", function(){
    	alert('데이터 보내기');
	    var sendData = document.getElementById("txtSendData").value;
	    var sendDataArray = new Array();
	    for (var i = 0; i < sendData.length; i++)
	    {
	    	sendDataArray[i] = sendData.charCodeAt(i);
	    }
	    socket.writeData (sendDataArray);
    });*/
}

onDeviceReady = function(device){	
	console.log(device);
	document.getElementById("divDeviceInfo").innerHTML = 
		"uuids:" + device.uuids + "<br>" + 
		"name:" + device.name + "<br>" + 
		"address:" + device.address + "<br>" + 
		"isBonded:" + device.isBonded + "<br>" + 
		"deviceClass:" + device.deviceClass + "<br>";
	console.log("-----" + device.uuids);
	var uuids = "" + device.uuids;	// string형태로 변경
	if (device.uuids.indexOf(uuids) != -1) {
		device.connectToServiceByUUID(uuids, onSocketConnected, onSocketError );	
	}
	else{
		alert("연결할수 없습니다.")
	}
}

onBondingSuccess = function(device){
	console.log("-----")
	console.log(device);
	document.getElementById("divDeviceInfo").innerHTML = 
		"uuids:" + device.uuids + "<br>" + 
		"name:" + device.name + "<br>" + 
		"address:" + device.address + "<br>" + 
		"isBonded:" + device.isBonded + "<br>" + 
		"deviceClass:" + device.deviceClass + "<br>";
	console.log("-----" + device.uuids);
	adapter.registerRFCOMMServiceByUUID(serviceUUID, "My service", 
            registerSuccessCallback, onError);
}

var init = function () { //2번
    /*if ( backEventListener !== null ) {
        return;
    }*/
    
    // TODO:: Do your initialization job
    console.log("init() called");
    
    listDeviceElement = document.getElementById("listDevice");
    listDevice = tau.widget.Listview(listDeviceElement);
    
    tau.event.on(listDeviceElement, "tap", function(event){
    	document.getElementById("txtDeviceName").value = 
    		event.target.getAttribute("devicename");
    	document.getElementById("txtDeviceAddress").value = 
    		event.target.getAttribute("deviceaddress");
    	tau.changePage("#pageDetail");   	
    });
    
    tau.event.on(document.getElementById("btnCreate"), "tap", function(){
    	document.getElementById("divAdapter").innerHTML = "어댑터생성";
    });
    
    tau.event.on(document.getElementById("btnDiscovery"), "tap", function(){
    	adapter.setPowered(true, startDiscovery, onSetPoweredError);
    });
    
    tau.event.on(document.getElementById("btnDevice"), "tap", function(){
    	
    	/*adapter.getDevice(event.target.getAttribute("deviceaddress"),
    		onDeviceReady, 
    		function(e) { alert(e.message);alert('연결실패'); });*/
    	
    	adapter.getDevice(document.getElementById("txtDeviceAddress").value,
    		onDeviceReady, 
    		function(e) { alert(e.message);alert('연결실패'); });
    });
    
    /*var backEvent = function(e) {
        if ( e.keyName == "back" ) {
            try {
                if ( $.mobile.urlHistory.activeIndex <= 0 ) {
                    // if first page, terminate app
                    unregister();
                } else {
                    // move previous page
                    $.mobile.urlHistory.activeIndex -= 1;
                    $.mobile.urlHistory.clearForward();
                    window.history.back();
                }
            } catch( ex ) {
                unregister();
            }
        }
    }*/
    
    // add eventListener for tizenhwkey (Back Button)
    //document.addEventListener( 'tizenhwkey', backEvent );
    //backEventListener = backEvent;
};

$(document).bind( 'pageinit', init );
$(document).unload( unregister );
