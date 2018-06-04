$(function(){
    var memberId = $('.memberId');
    var memberPw = $('.memberPw');
    var btn = $('#sbmt');
    btn.click(function(){
        console.log(memberId.val());
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: 'http://115.68.232.116/member/loginsuc.php',
            data: {memberId: memberId.val(),memberPw: memberPw.val()},
            success: function (json) {
                if(json.res == 'good') {
                    console.log(json.res);
                    tau.changePage("selection.html"); //페이지 전환 시 이렇게 해야 함.
                }else{
                    alert("아이디 또는 비밀번호가 일치하지 않습니다.");
                }
            },
            error: function(){
              console.log('failed');
            }
        })
    });
});