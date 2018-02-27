<?php
    include "../include/session.php";
    include "../include/dbConnect.php";
    /*echo "<pre>";
    var_dump($_POST);*/
    $memberId = $_POST['memberId'];
    $memberPw = md5($memberPw = $_POST['memberPw']);


    $sql = "SELECT * FROM member WHERE memberId = '{$memberId}' AND password = '{$memberPw}'";
    $res = $dbConnect->query($sql);


        $row = $res->fetch_array(MYSQLI_ASSOC);


        if ($row != null) { //ID PW 일치하는 게 있으면 세션 생성
            $_SESSION['ses_userid'] = $row['memberId'];
            echo $_SESSION['ses_userid'].'님 안녕하세요';
            echo "<button value=\"로그인하기\" class=\"submit\" onclick=\"location.href='./signOut.php'\">로그아웃</button>";
        }

        if($row == null){ //맞는 게 없음
            echo '로그인 실패 아이디와 비밀번호가 일치하지 않습니다.';
        }
?>