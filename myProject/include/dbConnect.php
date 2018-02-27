<?php
    /*$host = 'localhost';
    $user = 'root';
    $passWord = 'aod120';
    $dbName = 'myProject';*/

    $dbConnect = mysqli_connect('localhost','root','aod120','myproject');
    if(mysqli_connect_error()){
    	echo "연결 실패: ". mysqli_connect_error();
    }

    mysqli_select_db($dbConnect, "myproject");



?>
