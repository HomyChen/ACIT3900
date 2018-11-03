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
    var editRO = document.getElementById("editRO");
    var saveRO = document.getElementById("saveRO");
    
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
    var roOdometerIn = document.getElementById("roOdometerIn");
    var roOdometerOut = document.getElementById("roOdometerOut");
    var roNotes = document.getElementById("roNotes");
    
    var roTask = document.getElementById("roTask");
    var odometerOut= document.getElementById("odometerOut");
    var promisedTime = document.getElementById("promisedTime");
    
    var roDetails = document.getElementById("roDetails");
    
    //--------------------------These are the changes that I have done---------------------------------------------------------------
    var openPDF = document.getElementById("openPDF");
    var vehicle_info = null;
//-------------------------------------------------------------------------------------------------------------------------------
    
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
                    
                var resultsTable = $('#resultsTable').DataTable({
                    destroy: true,
                    select: true,
                    data: data,
                    "autoWidth": false,
                    "columns": [
                        {"data":"ro_id"},
                        {"data":"license_plate"},
                        {"data":"last_name"},
                        {"data":"first_name"},
                        {"data":"status"},
                    ]
                    
                });
                 
                resultsTable.on('select', function ( e, dt, type, indexes ) {
                    var rowData = resultsTable.rows( indexes ).data()[0];

                    odometerOut.disabled = true;
                    promisedTime.disabled = true;
                    saveRO.className = "btn btn-default pull-right invisible";
                    editRO.className = "btn btn-default pull-right visible";
//--------------------------These are the changes that I have done---------------------------------------------------------------
                    vehicle_info = rowData;
//-------------------------------------------------------------------------------------------------------------------------------          
                    roPopup.style.display = "block";
                    roNum.innerHTML = rowData.ro_id;
                    roCustName.innerHTML = rowData.last_name + ", " + rowData.first_name;
                    roTel.innerHTML = rowData.home_phone;
                    roCell.innerHTML = rowData.cell_phone;
                    roVIN.innerHTML = rowData.vin;
                    roLicense.innerHTML = rowData.license_plate;
                    roMake.innerHTML = rowData.make;
                    roModel.innerHTML = rowData.model;
                    roYear.innerHTML = rowData.year;
                    roOdometerIn.innerHTML = rowData.odometer_in;
                    odometerOut.innerHTML = rowData.odometer_out;
                    roNotes.innerHTML = rowData.vehicle_notes;
                    promisedTime.innerHTML = rowData.promised_time;
                    
                    $.ajax({
                        url:"/rosearch/taskSearch",
                        type:"post",
                        data:{
                            roID:rowData.ro_id
                        },
                        success:function(data){
                        if (data){
                            console.log(data);
//--------------------------These are the changes that I have done---------------------------------------------------------------
                            vehicle_info['tasks_info'] = data;
                            console.log(vehicle_info);
//-------------------------------------------------------------------------------------------------------------------------------
                            roTask.innerHTML="";
                            for(var i = 0; i<data.length; i++){
                                var comment = data[i].comments;
                                var box = '\u2610';
                                var linebreak = document.createElement('br');
                                var horLine = document.createElement('HR');
                                horLine.className = 'taskLine';
                                var taskName = data[i].task_name; 
                                var taskEntry = document.createElement('li');
                                var editTask = document.createElement("textarea");
                                editTask.className = 'form-control';
                                editTask.id = 'comments' + data[i].worktask_id;
                                editTask.disabled = true;
                                editTask.rows = '5';
                                editTask.style.marginBottom = '10px';
                                
                                
                                if(comment == null){
                                    editTask.value = "";
                                }else{
                                    editTask.value = comment;
                                }
                                
                                taskEntry.appendChild(document.createTextNode(taskName)).appendChild;

                                roTask.appendChild(taskEntry);
                                roTask.appendChild(editTask);
                                //roTask.appendChild(linebreak);
                                //roTask.appendChild(horLine);
                                //roTask.appendChild(linebreak.cloneNode());
                                
                                //roTask.appendChild(horLine.cloneNode());
                 
                            }
                            
                            editRO.onclick = function(){
                                for(var j = 0; j<data.length; j++){
                                    document.getElementById('comments' + data[j].worktask_id).disabled = false;
                                }
                                    saveRO.className = "btn btn-default pull-right visible";
                                    editRO.className = "btn btn-default pull-right invisible";
                                    odometerOut.disabled = false;
                                    promisedTime.disabled = false;
                                
                            }
                            
                            /*
                            var taskComments = {
                                ('worktask' + data[k].worktask_id) : ('worktask' + data[k].worktask_id).value,
                                ('worktask' + data[k].worktask_id) : ('worktask' + data[k].worktask_id).value
                            }
                            */   
                            
                            
                            //var arrayObj = {};
                            //array.push(arrayObj);
                            
                            saveRO.onclick = function(){
                                    var array = [{}];
                                    saveRO.className = "btn btn-default pull-right invisible";
                                    editRO.className = "btn btn-default pull-right visible";
                                    odometerOut.disabled = true;
                                    promisedTime.disabled = true;
                                
                                for(var k = 0; k<data.length; k++){
                                    document.getElementById('comments' + data[k].worktask_id).disabled = true;
                                    
                                    array.push({
                                        'worktask_id': data[k].worktask_id,
                                        'comments': (document.getElementById('comments' + data[k].worktask_id).value)
                                    })
                                    
                                }
                                
                                 $.ajax({
                                    url:"/rosearch/updateRO",
                                    type:"post",
                                    data:{
                                        worktaskIDComments:array,
                                        odometerOut:(odometerOut.value),
                                        roID:rowData.ro_id
                                    },
                                    success:function(data){
                                        if (data){
                                            console.log(data);
                                        }
                                    }
                                 });
                                
                            }                        
                            
                            }

                        }
                    });   
                });
                
                  
                }
                else{
                    alert("Error! taskSearch");
                }
            }
        });
        
    }
    
    
//--------------------------These are the changes that I have done---------------------------------------------------------------
    openPDF.onclick = function(){
        $.ajax({
            url: "/pdf/recievePDFInfo",
            type: "post",
            data: vehicle_info,
            success: function(data){
                console.log(data);
                window.open("/pdf/createRepairOrderPDF")
            }
        })
    }
//-------------------------------------------------------------------------------------------------------------------------------
    
    popupClose.onclick = function() {
        roPopup.style.display = "none";
        roTask.innerHTML="";
    }
    
    window.onclick = function(event) {
        if (event.target == roContainer) {
            roPopup.style.display = "none";
            roTask.innerHTML="";
    }
}
    
    
} );