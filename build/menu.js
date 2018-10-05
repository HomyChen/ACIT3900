$(document).ready(function () {

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $('#sidebarCollapse').toggleClass('dactive');
        $('#sidebarCollapse').removeClass("glyphicon glyphicon-menu-hamburger");


    });

});

//$('#sidebarCollapse').toggleClass('glyphicon glyphicon-remove');
