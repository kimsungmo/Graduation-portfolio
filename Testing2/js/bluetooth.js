var backEventListener = null;
var adapter = tizen.bluetooth.getDefaultAdapter();
var addr;

//window.open("blue.html?workout:"+name+"&sets:"+sets+"&reps:"+reps+"&weights:"+weights+"&rest_time:"+rest_time);
var temp=location.href.split("?");
var data=temp[1].split(/:|&/);//data:workout,dumbbell-curl,sets,1,reps,2,weights,3,rest_time,10
var name=data[1];
var sets=data[3];
var reps=data[5];
var weights=data[7];
var rest_time=data[9];
$("#name").html(name);
$("#sets").html('/'+sets);
$("#reps").html('/'+reps);
$("#weights").html(weights);
$("#rest_time").html(rest_time);
/*
//adapter.registerRFCOMMServiceByUUID(serviceUUID, 'My service'); //블루투스 디바이스와 연결하고 데이터 주고 받기
device.connectToServiceByUUID(serviceUUID, function(sock) {
    console.log('socket connected');
    socket = sock;
}, function(error) {
    console.log('Error while connecting: ' + error.message);
});
*/
var unregister = function() { //뒤로가기
    if ( backEventListener !== null ) {
        document.removeEventListener( 'tizenhwkey', backEventListener );
        backEventListener = null;
        window.tizen.application.getCurrentApplication().exit();
    }
}

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
             console.log ("찾기시작") ;
        },
        ondevicefound: function(device) {
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
     adapter.discoverDevices(discoverDevicesSuccessCallback, function(e) {
         alert("디바이스를 찾을 수 없습니다."+e);
     });
}

var onSetPoweredError = function(e) {
	/*alert(e.message);*/
	alert('전원설정에러 발생');
}
var onSocketError = function(err){
	//console.log(err);
	/*alert(err.name);*/
	alert('소켓에러 발생');
}

var count;
var cur_sets=0;
var cur_reps=0;
var cur_rest_time=0;
var onSocketConnected = function(socket) {
    console.log ("소켓이 연결됨");
    alert('소켓이 연결됨!');
    socket.onmessage = function () { //운동이 끝나면 아두이노의 count값을 0으로 초기화 해줘야 함.
    	count=socket.readData();
    	alert(count);
    	/*cur_sets=count/reps;*/
    	//cur_reps=count%reps;
   
    	/*if((count/reps==1)&&(count%reps==0)){
    		cur_sets=count/reps;
    	}*/
    	alert(cur_sets+' '+cur_reps);
    	$("#cur_sets").html(cur_sets);
    	$("#cur_reps").html(cur_reps);
    	/*function restTime(){
    		cur_rest_time+=1;
    		$("#cur_rest_time").html(cur_rest_time);//setInterval() 사용해서 1초마다 1더해서 초 만들어주기.
    	}
    	setInterval(restTime,1000);*/
    	    };
    socket.onclose = function() {
       alert("소켓이 종료되었습니다." + socket.peer.name);
    };

    // Sends data to peer.
    tau.event.on (document.getElementById("btnSendData"),"tap", function(){
    	alert('데이터 보내기');
    	var sendData = new Array();
	    sendData[0] = document.getElementById("txtSendData").value.charCodeAt(0);

	    /*var sendDataArray = new Array();
	    for (var i = 0; i < sendData.length; i++)
	    {
	    	sendDataArray[i] = sendData.charCodeAt(i);
	    }*/
	    
	    socket.writeData(sendData/*Array*/);
    });
}

onDeviceReady = function(device){
	console.log(device);
	/*document.getElementById("divDeviceInfo").innerHTML = 
		"uuids:" + device.uuids + "<br>" + 
		"name:" + device.name + "<br>" + 
		"address:" + device.address + "<br>" + 
		"isBonded:" + device.isBonded + "<br>" + 
		"deviceClass:" + device.deviceClass + "<br>";
	console.log("-----" + device.uuids);*/
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
	/*document.getElementById("divDeviceInfo").innerHTML = 
		"uuids:" + device.uuids + "<br>" + 
		"name:" + device.name + "<br>" + 
		"address:" + device.address + "<br>" + 
		"isBonded:" + device.isBonded + "<br>" + 
		"deviceClass:" + device.deviceClass + "<br>";
	console.log("-----" + device.uuids);
	adapter.registerRFCOMMServiceByUUID(serviceUUID, "My service", 
            registerSuccessCallback, onError);*/
}
/*onBondingSuccessCallback = function (device) { //블루투스 디바이스와 본딩 생성
    console.log('A bond is created - name: ' + device.name);
}
onErrorCallback = function (e) {
    console.log('Cannot create a bond, reason: ' + e.message);
}
adapter.createBonding('35:F4:59:D1:7A:03', onBondingSuccessCallback, onErrorCallback);*/
//Initialize function
var init = function () {
    if ( backEventListener !== null ) {
        return;
    }
    
    // TODO:: Do your initialization job
    console.log("init() called");
	
    listDeviceElement = document.getElementById("listDevice");
    listDevice = tau.widget.Listview(listDeviceElement);
    
    tau.event.on(listDeviceElement, "tap", function(event){//탐색된 블루투스 클릭 시
    	/*document.getElementById("txtDeviceName").value = 
    		event.target.getAttribute("devicename");
    	document.getElementById("txtDeviceAddress").value = 
    		event.target.getAttribute("deviceaddress");*/
    	addr = event.target.getAttribute("deviceaddress");//addr변수에 블루투스의 주소값 넣음
    	
    	adapter.getDevice(addr, /*addr 주소를 갖는 블루투스 연결*/onDeviceReady, function(e){
    		alert('연결실패');
    	});
    	//tau.changePage("characterPage.html"); 
    });
    
    /*tau.event.on(document.getElementById("btnCreate"), "tap", function(){
    	document.getElementById("divAdapter").innerHTML = "어댑터생성";
    });*/
    
    tau.event.on(document.getElementById("btnDiscovery"), "tap", function(){
    	adapter.setPowered(true, startDiscovery, onSetPoweredError);
    });
    
    /*tau.event.on(document.getElementById("btnDevice"), "tap", function(){
    	//adapter.getDevice(document.getElementById("txtDeviceAddress").value,
    	adapter.getDevice(addr,
    		onDeviceReady, 
    		function(e) {alert('연결실패'); });
    	//tau.changePage("#pageChar");   	
    });*/
    
    var backEvent = function(e) {
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
    }
    
    // add eventListener for tizenhwkey (Back Button)
    document.addEventListener( 'tizenhwkey', backEvent );
    backEventListener = backEvent;
};

$(document).bind( 'pageinit', init );
$(document).unload( unregister );
