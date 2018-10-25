$(document).ready(()=>{
	ncbut = document.getElementById("ncbut")
	search_button = document.getElementById("search_button")
	query_category = document.getElementById("query_category")
	query_search = document.getElementById("query_search")
	search_result_row = document.getElementById("search_result_row")
	submit_button = document.getElementById("submit_button")
    searchBody = document.getElementById("searchBody")
    containerDiv = document.getElementById("container")
    
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
    
    /*var searchTable = $('#searchTable').DataTable( {
        select: true
    } );
    
    */
    
	var selected_id = null

    
	ncbut.onclick = ()=>{
        //Clear forms if they are filled
        lastNameInput.value = "";
        firstNameInput.value = "";
        homePhoneInput.value = "";
        cellPhoneInput.value = "";
        streetInput.value = "";
        cityInput.value = "";
        postalCodeInput.value = "";

        vinInput.value = "";
        yearInput.value = "";
        makeInput.value = "";
        modelInput.value = "";
        licenseInput.value = "";
        
        searchBody.style.display = 'none';
        containerDiv.style.display = 'block';
        
	}

	/*Search Button*/
    
    
    
    
	search_button.onclick = ()=>{
        
		$.ajax({
			url: '/search',
			type: 'post',
			data: {
				searchQuery: query_search.value,
				searchType: query_category.value
			},
			success: (data) => {
                
                var sTable = $('#searchTable').DataTable({
                    destroy: true,
                    select: {
                        style: 'single'
                    },
                    data: data.data,
                    "columns": [
                        { "data": "last_name"},
                        { "data": "first_name"},
                        { "data": "model"},
                        { "data": "license"},
                        { "data": "vin"},
                    ]
                });
                sTable.on( 'select', function ( e, dt, type, indexes ) {
                    if (type === 'row') {
                        var tdata = sTable.rows(indexes).data()[0];
                        submit_button.addEventListener("click", function(){
                            
                            //Autofill Customer and vehicle info
                            lastNameInput.value = tdata.last_name;
                            firstNameInput.value = tdata.first_name;
                            homePhoneInput.value = tdata.home_phone;
                            cellPhoneInput.value = tdata.cell_phone;
                            streetInput.value = tdata.street;
                            cityInput.value = tdata.city;
                            postalCodeInput.value = tdata.postal_code;
                            
                            vinInput.value = tdata.vin;
                            yearInput.value = tdata.year;
                            makeInput.value = tdata.make;
                            modelInput.value = tdata.model;
                            licenseInput.value = tdata.license;
                            
                            //Bring back to check-in form
                            searchBody.style.display = 'none';
                            containerDiv.style.display = 'block';
                        });
                    }
                } );
                
            }
		})
	}

	/*Submit Button
	submit_button.onclick = () =>{
        window.location.assign("/")   
	}
    */
})