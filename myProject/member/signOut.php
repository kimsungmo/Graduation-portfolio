<?php
    include "../include/session.php";
    #echo $_SESSION['ses_userid'].'님 로그아웃 하겠습니다.';

    unset($_SESSION['ses_userid']);
    echo '로그아웃되었습니다.';
    /*if(!$_SESSION['ses_userid']){
        echo '<br /><br />로그아웃 완료 ';
    }*/
?>