var adapter = tizen.bluetooth.getDefaultAdapter();
var addr;
//window.open("blue.html?workout:"+name+"&sets:"+sets+"&reps:"+reps+"&weights:"+weights+"&rest_time:"+rest_time);
var temp=location.href.split("?");
var data=temp[1].split(/:|&/);//data:workout,dumbbell-curl,sets,1,reps,2,weights,3,rest_time,10
var name=decodeURI(data[1]);//이전 페이지에서 인코딩되어서 넘어 온 한글을 디코딩해야 안깨짐
var sets=data[3];
var reps=data[5];
var weights=data[7];
var rest_time=data[9];

$("#name").html(name+'/'+weights+'kg');
$("#sets").html('/'+sets);
$("#reps").html('/'+reps);
$("#rest_time").html(rest_time+'초');
var count;
var cur_sets=0;
var cur_reps=0;
var cur_rest_time=0;
$("#cur_sets").html(cur_sets);
$("#cur_reps").html(cur_reps);

var listDeviceElement;
var listDevice;

$("#con").click(function(){
	addr = "20:15:03:02:62:01";//addr변수에 블루투스의 주소값 넣음
	adapter.getDevice(addr, /*addr 주소를 갖는 블루투스 연결*/onDeviceReady, function(e){
		alert('연결실패');
	});
})
var set_done=function(){///운동 종료 시 지금까지의 데이터 서버로 전송.
	$.ajax({
		type:'post',
		dataType:'json',
		url:'http://115.68.232.116/records/intensityUp.php',
		data:{
			sets:cur_sets,
			reps:cur_reps,
			rest_time:cur_rest_time
		},
		success:function(json){
			if(json.res=='good'){
				
			}else{
				alert('DB 서버 오류');
			}
		},
		complete:function(){
		},
		error:function (jqXHR, exception) {
	        var msg = '';
	        if (jqXHR.status === 0) {
	            msg = 'Not connect.\n Verify Network.';
	        } else if (jqXHR.status == 404) {
	            msg = 'Requested page not found. [404]';
	        } else if (jqXHR.status == 500) {
	            msg = 'Internal Server Error [500].';
	        } else if (exception === 'parsererror') {
	            msg = 'Requested JSON parse failed.';
	        } else if (exception === 'timeout') {
	            msg = 'Time out error.';
	        } else if (exception === 'abort') {
	            msg = 'Ajax request aborted.';
	        } else {
	            msg = 'Uncaught Error.\n' + jqXHR.responseText;
	        }
	        alert(msg);
		}
	})
};
var finish=function(){
	$.ajax({
		type:'post',
		dataType:'json',
		url:'http://115.68.232.116/records/intensityUp.php',
		data:{
			sets:cur_sets,
			reps:cur_reps,
			rest_time:cur_rest_time
		},
		success:function(json){
			if(json.res=='good'){
				
			}else{
				alert('DB 서버 오류');
			}
		},
		complete:function(){
			location.replace('workSettingPage.html');
		},
		error:function (jqXHR, exception) {
	        var msg = '';
	        if (jqXHR.status === 0) {
	            msg = 'Not connect.\n Verify Network.';
	        } else if (jqXHR.status == 404) {
	            msg = 'Requested page not found. [404]';
	        } else if (jqXHR.status == 500) {
	            msg = 'Internal Server Error [500].';
	        } else if (exception === 'parsererror') {
	            msg = 'Requested JSON parse failed.';
	        } else if (exception === 'timeout') {
	            msg = 'Time out error.';
	        } else if (exception === 'abort') {
	            msg = 'Ajax request aborted.';
	        } else {
	            msg = 'Uncaught Error.\n' + jqXHR.responseText;
	        }
	        alert(msg);
		}
	})
};
var game_over=function(){
	var end=alert('수고하셨습니다.');
	if(end==undefined){//alert 확인 시
		finish(); //DB저장, 페이지 이동
	}
}
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
        	alert('기기를 찾았습니다');
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
	alert('전원설정에러 발생');
}
var onSocketError = function(err){
	alert('소켓에러 발생');
}
var onSocketConnected = function(socket) {
    console.log ("소켓이 연결됨");
    socket.writeData([0]);//운동 시작 시 아두이노의 count값을 0으로 초기화 해줘야 함.
    alert('운동 시작!');
    socket.onmessage=function(){
    	count=socket.readData();//아두이노에서 값 받아오기
    	//cur_sets=count/reps;//이건 됌
    	cur_reps=count%reps;
    	if((count!=0)&&(count%reps==0)){//지정된 반복 수만큼 운동했다면
			cur_sets+=count/reps;//set에 반영
			if(cur_sets>=sets){//현재 세트가 지정된 세트보다 같거나 크면 DB에 데이터 저장 후 종료
				alert('수고하셨습니다.');
				finish();
			}else{
	    		temp_time=rest_time;
	    		var rest_start=confirm('휴식 시작');
	    		if(rest_start==true){
	    		//rest_time만큼 휴식 취하게 하기.
		    		var timer=setInterval(function(){
		    			$("#rest_time").html(temp_time-=1);
		    			if(temp_time==0){
		    				clearInterval(timer);
		    				var rest_end=confirm('휴식 종료!');
		    				if(rest_end==true){
		    					//휴식 시간이 끝나면 count=0됨. 
		    					$("#rest_time").html(rest_time);
		    					socket.writeData([0]);//아스키코드 48은 정수 0
		    				}
		    			}
		    		},1000);
		    		cur_rest_time+=rest_time;
	    		}
	    		set_done();
			}
    	}
    	$("#cur_sets").html(cur_sets);
    	$("#cur_reps").html(cur_reps);
    };
    socket.onclose = function() {
       alert("기기가 종료되었습니다." + socket.peer.name+socket);
    };
};
onDeviceReady = function(device){
	console.log(device);
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
}
//Initialize function
var init = function () {
    // TODO:: Do your initialization job
    console.log("init() called");
	
    listDeviceElement = document.getElementById("listDevice");
    listDevice = tau.widget.Listview(listDeviceElement);
    
    tau.event.on(listDeviceElement, "tap", function(event){//탐색된 블루투스 클릭 시
    	alert('연결 중');
    	addr = event.target.getAttribute("deviceaddress");//addr변수에 블루투스의 주소값 넣음
    	adapter.getDevice(addr, /*addr 주소를 갖는 블루투스 연결*/onDeviceReady, function(e){
    		alert('연결실패');
    	});
    });
    
    tau.event.on(document.getElementById("btnDiscovery"), "tap", function(){
    	alert('기기를 찾는 중...');
    	adapter.setPowered(true, startDiscovery, onSetPoweredError);
    });
    
    document.addEventListener('tizenhwkey', function(ev){
    	if(ev.keyName==='back'){//confirm when user click back key
    		var res=confirm('운동을 종료하시겠습니까?');
    		if(res==true){
    			finish();
    		}
    	}
    });
};
$(document).bind( 'pageinit', init );
$(document).unload( unregister );