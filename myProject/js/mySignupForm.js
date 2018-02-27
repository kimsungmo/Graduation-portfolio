$(function(){

    //아이디 중복 확인 소스
    var memberIdCheck = $('.memberIdCheck');
    var memberId = $('.memberId');
    var memberIdComment = $('.memberIdComment');
    var memberPw = $('.memberPw');
    var memberPw2 = $('.memberPw2');
    var memberPwComment = $('.memberPwComment');
    var memberPw2Comment = $('.memberPw2Comment');
    var memberNickName = $('.memberNickName');
    var memberNickNameComment = $('.memberNickNameComment');
    var memberEmailAddress = $('.memberEmailAddress');
    var memberEmailAddressComment = $('.memberEmailAddressComment');
    var memberBirthDay = $('.memberBirthDay');
    var memberBirthDayComment = $('.memberBirthDayComment');
    var idCheck = $('.idCheck');
    var pwCheck2 = $('.pwCheck2');
    var eMailCheck = $('.eMailCheck');

    memberIdCheck.click(function(){
        console.log(memberId.val());
        $.ajax({
            type: 'post',
            dataType: 'json', //서로 다른 언어간에 데이터 전송을 위한 표준
            url: '../member/memberIdCheck.php',
            data: {memberId: memberId.val()}, //memberId.val() 멤버 input에 적힌 ID

            success: function (json) {
                if(json.res == 'good') {
                    console.log(json.res);
                    memberIdComment.text('사용가능한 아이디 입니다.');
                    idCheck.val('1');
                }else{
                    memberIdComment.text('다른 아이디를 입력해 주세요.');
                    memberId.focus();
                }
            },

            error: function(){
              console.log('failed');

            }
        })
    });
    memberPw.blur(function(){
        if(!memberPw.val()){
            memberPwComment.text('비밀번호를 입력해주세요');
           // alert(memberPw.val());
        }else if(memberPw.val()!=''){
            memberPwComment.text('입력 완료');
        }
    });
    //비밀번호 동일 한지 체크
    memberPw2.blur(function(){ //input란을 떠났을 때 함수 실행.
       if(memberPw.val() == memberPw2.val() && memberPw.val() && memberPw2.val()){
           memberPw2Comment.text('비밀번호가 일치합니다.');
           pwCheck2.val('1');
       }else if(!memberPw2.val()){
            memberPw2Comment.text('비밀번호를 입력해주세요');
       }else{
           memberPw2Comment.text('비밀번호가 일치하지 않습니다.');
       }
    });

    //이메일 유효성 검사
    memberEmailAddress.blur(function(){
        var regex=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
        if(regex.test(memberEmailAddress.val()) === false){
            memberEmailAddressComment.text('이메일이 유효성에 맞지 않습니다.');
            eMailCheck.val('1');
        }else{
            memberEmailAddressComment.text('올바른 이메일 입니다.');
        }
    });

});

function checkSubmit(){
    var idCheck = $('.idCheck');
    var pwCheck2 = $('.pwCheck2');
    var eMailCheck = $('.eMailCheck');
    var memberBirthDay = $('.memberBirthDay');
    var memberNickName = $('.memberNickName');
    var memberName = $('.memberName');


    if(idCheck.val() == '1'){
        res = true;
    }else{
        res = false;
    }
    if(pwCheck2.val() == '1'){
        res = true;
    }else{
        res = false;
    }
    if(eMailCheck.val() == '1'){
        res = true;
    }else{
        res = false;
    }
    if(memberName.val() != ''){
        res = true;
    }else{
        res = false;
    }
    if(memberBirthDay.val() != ''){
        res = true;
    }else{
        res = false;
    }
    if(memberNickName.val() != ''){
        res = true;
    }else{
        res = false;
    }

    if(res == false){
        alert('회원가입 폼을 정확히 채워 주세요.');
    }
    return res;

}


