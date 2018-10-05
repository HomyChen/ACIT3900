$(document).ready(function(){
    console.log("ready");
    
    var menuPosition = document.getElementById("menuPosition");
    
    $.ajax({
        url:"/menu",
        type:"get",
        success:function(resp){
            console.log(resp);
            $(menuPosition).html(resp);
        }
    });
});