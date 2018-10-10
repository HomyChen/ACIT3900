$(document).ready(function () {

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $('#sidebarCollapse').toggleClass('dactive');
        $('#burgericon').toggleClass('glyphicon glyphicon-remove-circle');
    });

});