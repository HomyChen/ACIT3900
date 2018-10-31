$(document).ready(()=>{
	var ncbut = document.getElementById("ncbut");
	var search_button = document.getElementById("search_button");
	var query_category = document.getElementById("query_category");
	var query_search = document.getElementById("query_search");
	var search_result_row = document.getElementById("search_result_row");
	var submit_button_cust_only = document.getElementById("submit_button_cust_only");
    var submit_button_cust_vehicle = document.getElementById("submit_button_cust_vehicle");
    var searchBody = document.getElementById("searchBody");
    var containerDiv = document.getElementById("container");
    var searchPageBut = document.getElementById("searchBut");
    
    // input of user Info
    var lastNameInput       = document.getElementById("lnInp");
    var firstNameInput      = document.getElementById("fnInp");
    var homePhoneInput      = document.getElementById("hpInp");
    var cellPhoneInput      = document.getElementById("cpInp");
    var streetInput         = document.getElementById("stInp");
    var cityInput           = document.getElementById("ctInp");
    var postalCodeInput     = document.getElementById("pcInp");

    // Input for vehicle info
    var vinInput            = document.getElementById("vinInp");
    var yearInput           = document.getElementById("yrInp");
    var makeInput           = document.getElementById("makeInp");
    var modelInput          = document.getElementById("modelInp");
    var licenseInput        = document.getElementById("lpInp");
    var odoInput            = document.getElementById("oiInp");
    var vehicleNotesInput   = document.getElementById("vnInp");
    var divToAppendCommonRequests = document.getElementById("dropDownAppended");
    
    //Search Table
    var searchTable = document.getElementById("searchTable");
    var searchResult = document.getElementById("search_result");
    
    //Set status in session to 0 when page loads 
    //req.session.status in index.js determines the scenario:
    //Status 0: New Customer, New Vehicle
    //Status 1: Old Customer, New Vehicle
    //Status 2: Old Customer, Old Vehicle
    ajaxSetVariables(0);
    
    //Brings up search page when "Existing Customer" button is pressed. Makes the check-in page content invisible.
    searchPageBut.onclick = ()=>{
        makeSearchVisible();
	}

    //Makes "New Customer" button clear the fields if they are filled
	ncbut.onclick = ()=>{
        ajaxSetVariables(0);
        clearCustomer();
        clearVehicle();
        makeCheckInVisible();
	}

	/*Search Page Search Button*/

	search_button.addEventListener('click', function(){
        //Turn search button to display loading
        search_button.innerHTML = 'LOADING...';
        
        //Ajax call to send what type of search it is and what is being searched
        $.ajax({
            url: '/search',
            type: 'post',
            data: {
                searchQuery: query_search.value,
                searchType: query_category.value
            },
            success: (result) => {
                if(result.status == "success"){
                    //Turn search button back
                    search_button.innerHTML = 'Search';

                    //Initialize DataTables
                    var sTable = $('#searchTable').DataTable({
                            destroy: true,
                            select: {
                                style: 'single'
                            },
                            data: result.data,
                            "columns": [
                                { "data": "last_name"},
                                { "data": "first_name"},
                                { "data": "cell_phone"},
                                { "data": "model"},
                                { "data": "license_plate"},
                                { "data": "vin"},
                            ]
                        });

                    //Add function for selecting rows on tabl
                    sTable.on( 'select', function ( e, dt, type, indexes ) {
                        if (type === 'row') {
                            
                            //Define a focusout event so that the autofill will get past the validator without clicking on the vin input and then clicking elsewhere
                            var focusout = new Event('focusout');
                            
                            var tdata = sTable.rows(indexes).data()[0];
                            submit_button_cust_vehicle.addEventListener("click", function(){  

                                //Set status to 2: Old Customer, Old Vehicle
                                ajaxSetVariables(2); 
                                //Autofill both customer and vehicle forms
                                autofillCustomer(tdata);
                                autofillVehicle(tdata);

                                //Bring back to check-in form
                                makeCheckInVisible();
                                
                                //Trigger focusout event on vinInput to get past validator on submit button
                                vinInput.dispatchEvent(focusout);
                            });
                            submit_button_cust_only.addEventListener("click", function(){

                                //Set status to 1: Old Customer, New Vehicle
                                ajaxSetVariables(1);

                                //Autofill only customer form, clear vehicle form
                                autofillCustomer(tdata);
                                clearVehicle();

                                //Bring back to check-in form
                                makeCheckInVisible();
                                
                                //Trigger focusout event on vinInput to get past validator on submit button
                                vinInput.dispatchEvent(focusout);
                            });
                        }
                    } );
                }else if(result.status == "fail"){
                    search_button.innerHTML = 'Search';
                    alert("Search cannot contain special characters");
                }
                

            }
        });
    });
    
    function ajaxSetVariables(status){
        $.ajax({
            url:"./setVariables",
            type:"post",
            data:{
                status:status,
                info:[1,1]
            },
            success:function (resp) {
                console.log('Status set to '+resp);
            }
        });
    }

    function makeCheckInVisible(){
        //Makes Check-in Page visible and Search Page invisible
        searchBody.style.display = 'none';
        containerDiv.style.display = 'block';
    }
    
    function makeSearchVisible(){
        //Makes Search Page Visible and Check-in page invisible
        searchBody.style.display = 'block';
        containerDiv.style.display = 'none'; 
    }
    
    function autofillCustomer(data){
        //Autofill Customer info
        lastNameInput.value = data.last_name;
        firstNameInput.value = data.first_name;
        homePhoneInput.value = data.home_phone;
        cellPhoneInput.value = data.cell_phone;
        streetInput.value = data.street;
        cityInput.value = data.city;
        postalCodeInput.value = data.postal_code;
    }
    
    function autofillVehicle(data){
        //Autofill vehicle info
        vinInput.value = data.vin;
        yearInput.value = data.year;
        makeInput.value = data.make;
        modelInput.value = data.model;
        licenseInput.value = data.license_plate;
    }
    
    function clearCustomer(){
        //Clears Customer info
        lastNameInput.value = "";
        firstNameInput.value = "";
        homePhoneInput.value = "";
        cellPhoneInput.value = "";
        streetInput.value = "";
        cityInput.value = "";
        postalCodeInput.value = "";
    }
    
    function clearVehicle(){
        //Clears vehicle info
        vinInput.value = "";
        yearInput.value = "";
        makeInput.value = "";
        modelInput.value = "";
        licenseInput.value = "";
    }
})