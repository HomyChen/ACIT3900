$(document).ready(function(){
    var menuPosition = document.getElementById("menuPosition");
    $.ajax({
        url:"/menu",
        type:"get",
        success:function(resp){
            $(menuPosition).html(resp);
        }
    });

});