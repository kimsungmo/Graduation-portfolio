<?php

    include "../include/dbConnect.php"; //DB 접속을 위한 코드 including.

    $memberId = $_POST['memberId']; //memberId 변수에 받아온 memberId 를 넣음
 
    $sql = "SELECT * FROM member WHERE memberId = '{$memberId}'"; //DB에 방금 입력된 아이디와 같은 아이디가 있는 지 확인.

    $res = $dbConnect->mysqli_query($sql); 


    if($res->num_rows >= 1){ //검색된 아이디가 1개라도 있으면 bad, 0개면 good
        echo json_encode(array('res'=>'bad'));
    }else{
        echo json_encode(array('res'=>'good'));
    }

?>

