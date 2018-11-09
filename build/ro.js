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
    var promiseDate = document.getElementById("promiseDate");
    var promiseHour = document.getElementById("timeHour");
    var promiseMin = document.getElementById("timeMin");
    var promiseAmPm = document.getElementById("timeAmPm");
    
    var roDetails = document.getElementById("roDetails");
    
    //--------------------------These are the changes that I have done---------------------------------------------------------------
    var openPDF = document.getElementById("openPDF");
    var vehicle_info = null;
//-------------------------------------------------------------------------------------------------------------------------------
    
    searchROBut.onclick = function() {
    console.log("search button clicked");
        
        
        
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
                    
                    disableInputs();
                    
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
                    odometerOut.value = rowData.odometer_out;
                    roNotes.innerHTML = rowData.vehicle_notes;
                    //promisedTime.innerHTML = rowData.promised_time;
                    
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
                                var task_id = data[i].worktask_id;
                                var comment = data[i].comments;
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
                                
                                //Add Parts Button
                                var addPartBut = document.createElement("button");
                                addPartBut.className = "btn btn-default";
                                addPartBut.innerHTML = "Add Part";
                                addPartBut.style.marginBottom = "15px";
                                //addPartBut.id = task_id;
                                addPartBut.onclick = function(task_id){
                                    return function(){
                                        addPartButFunc(task_id);
                                    };
                                }(task_id);
                                
                                taskEntry.appendChild(document.createTextNode(taskName)).appendChild;
                                
                                var taskDiv = document.createElement("div");
                                
                                taskDiv.appendChild(taskEntry);
                                taskDiv.appendChild(editTask);
                                taskDiv.appendChild(addPartBut);
                                taskDiv.id = "taskNum"+task_id;
                                roTask.appendChild(taskDiv);
                            }
                            
                            
                            editRO.onclick = function(){
                                for(var j = 0; j<data.length; j++){
                                    document.getElementById('comments' + data[j].worktask_id).disabled = false;
                                }
                                    enableInputs();
                                    
                            }
                            
                            saveRO.onclick = function(){
                                    var array = [{}];
                                    disableInputs();
                                
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
    
    function disableInputs(){
        saveRO.className = "btn btn-default pull-right invisible";
        editRO.className = "btn btn-default pull-right visible";
        odometerOut.disabled = true;
        promiseDate.disabled = true;
        promiseHour.disabled = true;
        promiseMin.disabled = true;
        promiseAmPm.disabled = true;
        promiseHour.style.backgroundColor = "#eee";
        promiseMin.style.backgroundColor = "#eee";
        promiseAmPm.style.backgroundColor = "#eee";
    }
    
    function enableInputs(){
        saveRO.className = "btn btn-default pull-right visible";
        editRO.className = "btn btn-default pull-right invisible";
        odometerOut.disabled = false;
        promiseDate.disabled = false;
        promiseHour.disabled = false;
        promiseMin.disabled = false;
        promiseAmPm.disabled = false;
        promiseHour.style.backgroundColor = "#fff";
        promiseMin.style.backgroundColor = "#fff";
        promiseAmPm.style.backgroundColor = "#fff";
    }
    
    function addPartButFunc(worktask_id){
        console.log("Task id: "+worktask_id);
        var partsDiv = document.createElement("div");
        partsDiv.className = "row";
        partsDiv.style.marginBottom = "15px";
        var partNoInp = document.createElement("input");
        partNoInp.className = "col-sm-2";
        partNoInp.placeholder = "Part Number";
        //partNoInp.id = "partNoInp"
        var partDescInp = document.createElement("input");
        partDescInp.className = "col-sm-2";
        partDescInp.placeholder = "Description";
        var partQtyInp = document.createElement("input");
        partQtyInp.className = "col-sm-2";
        partQtyInp.placeholder = "Quantity";
        var partUnitPriceInp = document.createElement("input");
        partUnitPriceInp.className = "col-sm-2";
        partUnitPriceInp.placeholder = "Unit Price";
        var partSellPriceInp = document.createElement("input");
        partSellPriceInp.className = "col-sm-2";
        partSellPriceInp.placeholder = "Sell Price"
        var partSupplierNameInp = document.createElement("input");
        partSupplierNameInp.className = "col-sm-2";
        partSupplierNameInp.placeholder = "Supplier"
        
        partsDiv.appendChild(partNoInp);
        partsDiv.appendChild(partDescInp);
        partsDiv.appendChild(partQtyInp);
        partsDiv.appendChild(partUnitPriceInp);
        partsDiv.appendChild(partSellPriceInp);
        partsDiv.appendChild(partSupplierNameInp);
        
        document.getElementById("taskNum"+worktask_id).appendChild(partsDiv);
    }
    
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