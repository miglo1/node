/**
 * Created by ujipin on 17/1/26.
 */
u.ajax({
    url: "/api/v5/upass/home",
    aysnc: false
},function(data){
    if(data.status_code==200){

    }else{
        alert(data.message);
    }
});