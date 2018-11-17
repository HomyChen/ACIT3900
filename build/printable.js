$(document).ready(function(){
    console.log("ready");
    
    var printable = document.getElementById("printable");
    var header = document.getElementById("header");
    var topRight = document.getElementById("topRight");
    var customerInfo = document.getElementById("customerInfo");
    var vehicleInfo1 = document.getElementById("vehicleInfo1");
    var vehicleInfo2 = document.getElementById("vehicleInfo2");
    var tasksRequested = document.getElementById("tasksRequested");
    var footer = document.getElementById("footer");
    var mileageOut = document.getElementById("mileageOut");
    var wheelTorque = document.getElementById("wheelTorque");
    var wrap = document.getElementById("wrap");
    
    var topPadding = "70px";
    
    function getROData(){
        $.ajax({
            url: "/print/getROInfo",
            type: "post",
            success: function(data){
                console.log(data);
                fillPageData(data);
                // window.print();
            }
        });
    }
    
    function fillPageData(data){

        if(data.first_name == ""){
            var customerName = data.last_name
        }else{
            var customerName = data.last_name+", "+data.first_name;
        }
        
        var customerData = {
            "Customer Name" : customerName,
            "Cell Phone" : data.cell_phone,
            "Home Phone" : data.home_phone
        };
        
        var vehicleData1 = {
            "VIN" : data.vin,
            "License Plate" : data.license_plate,
            "Year" : data.year,
            "Make" : data.make,
        };
        
        var vehicleData2 = {
            "Model" : data.model,
            "Odometer (In)" : data.odometer_in,
            "Odometer (Out)" : data.odometer_out,
        };
        
        var vehicleData3 = {
            "Vehicle Notes" : data.vehicle_notes
        };
        
        var promised_date = data.promised_time.substring(0, 10);
        var promised_time = data.promised_time.substring(11, 16);
        
        topRight.innerHTML = formatLabel("Repair Order #", false)+data.ro_id+formatLabel("Promised Time")+promised_date+" "+promised_time;
        
        customerInfo.innerHTML = fillInfoDiv(customerData);
        vehicleInfo1.innerHTML = fillInfoDiv(vehicleData1);
        vehicleInfo2.innerHTML = fillInfoDiv(vehicleData2);
        vehicleInfo3.innerHTML = fillInfoDiv(vehicleData3);
        
        fillTasksRequestedHTML(data.tasks_info);
    };
        
    function formatLabel(label, breakInBeginning){
        if(breakInBeginning === false){
            return ("<b>"+label+":</b> ");
        }else{
            return ("<br><b>"+label+":</b> ");
        };
    };
    
    function fillInfoDiv(divData){
        var returnString = "";
        for(item in divData){
            returnString += formatLabel(item)+divData[item];
        }
        return returnString;
    }
    
    function fillTasksRequestedHTML(array){
        var lastindex = 0;
        for(let i = 0; i < array.length; i++){
            var taskName = array[i].task_name;
            var taskDiv = document.createElement("div");
            for(var j = 0; j < 10; j++){
                taskName += '<hr>';
            }
            taskDiv.id = "printTasks";
            if(i === 3 || ((i - 3) % 5) === 0 ){
                taskDiv.style.paddingTop = topPadding;
            }
            taskDiv.innerHTML = "&#10063; "+taskName;
            tasksRequested.appendChild(taskDiv);   
            lastindex++;
        }
        if(lastindex === 3 || ((lastindex - 3) % 5) === 0 ){
            footer.style.paddingTop = topPadding;
        }
        
    }
    
    getROData();
    
});