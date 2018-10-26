$(document).ready(function() {
    
    /*$('#resultsTable').DataTable( {
        select: true,
    } );
    */
    // user search input and parameters
    var roSearchInp = document.getElementById("roSearchInp");
    var SOptionsDropdown = document.getElementById("SOptionsDropdown");
    var ROOptionsDropdown = document.getElementById("ROOptionsDropdown");
    
    // buttons
    var searchROBut = document.getElementById("searchROBut");
    var popupClose = document.getElementById("popupClose");
    
    // repair order popup
    var roPopup = document.getElementById("roPopup");
    var popupContent = document.getElementById("popupContent");
    var popupClose = document.getElementsByClassName("close")[0];
    var roContainer = document.getElementById("roContainer");
    
    var roNum = document.getElementById("roNum");
    var roCustName = document.getElementById("roCustName");
    var roTel = document.getElementById("roTel");
    var roCell = document.getElementById("roCell");
    var roVIN = document.getElementById("roVIN");
    var roLicense = document.getElementById("roLicense");
    var roYear = document.getElementById("roYear");
    var roMake = document.getElementById("roMake");
    var roModel = document.getElementById("roModel");
    
    searchROBut.onclick = function() {
    console.log("search button clicked");
        
        //$('#resultsTable').DataTable().destroy();
        
        $.ajax({
            url:"/rosearch/AroSearch",
            type:"post",
            data:{
                roSearchWord:roSearchInp.value,
                roSearchBy:SOptionsDropdown.value,
                roStatus:ROOptionsDropdown.value,  
            },
            success:function(data){
                if (data){
                    console.log(data);
                
                    
                var roDetails = document.getElementById("roDetails");
                    
                var resultsTable = $('#resultsTable').DataTable({
                    destroy: true,
                    select: true,
                    data: data,
                    "autoWidth": false,
                    "columns": [
                        {"data":"ro_id"},
                        {"data":"license"},
                        {"data":"last_name"},
                        {"data":"first_name"},
                        {"data":"status"},
                    ]
                    
                });
                 
                
                resultsTable.on('select', function ( e, dt, type, indexes ) {
                    var rowData = resultsTable.rows( indexes ).data()[0];
                    console.log(rowData);
                    //roDetails.innerHTML="";
                    //roDetails.innerHTML="Repair Order Details'<br>" + rowData.first_name + "<br>"
                    
                    roPopup.style.display = "block";
                    roNum.innerHTML = rowData.ro_id;
                    roCustName.innerHTML = rowData.last_name + ", " + rowData.first_name;
                    roTel.innerHTML = rowData.home_phone;
                    roCell.innerHTML = rowData.cell_phone;
                    roVIN.innerHTML = rowData.vin;
                    roLicense.innerHTML = rowData.license;
                    roMake.innerHTML = rowData.make;
                    roModel.innerHTML = rowData.model;
                    
                });
                
            
                
                    
                }
                else{
                    alert("Error!");
                }
            }
        });
        
    }
    
    
    popupClose.onclick = function() {
        roPopup.style.display = "none";
    }
    
    window.onclick = function(event) {
        if (event.target == roContainer) {
            roPopup.style.display = "none";
    }
}
    
    
} );