$.showUser = function(workout){
    var obj;
    var i;
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: 'http://115.68.232.116/records/womyrec.php', //doDumbbells DB에 접근해서 ID에 맞는 정보 검색
        data:{
            workout : workout
        },
        success : function(result) {
            if(result.success == false) {
                alert(result.msg);
                return;
            }else{
                i=0;
                var tbl = "";
                tbl += '<table border=1 class="table"><thead class="thead-dark"><tr><th>date</th><th>sets</th><th>reps</th><th>weight</th></tr></thead>';
                while(result[i]){
                    tbl += '<tr><td>'+result[i].date+'</td><td>'+result[i].sets+'</td><td>'+result[i].reps+'</td><td>'+result[i].weight+'</td></tr>';
                    i++;
                }
                tbl += '</table>'
                document.getElementById("txtHint").innerHTML = tbl;
            }   
        },
        error : function(xhr,status,erre){
            alert(error);
        }        
    })
}