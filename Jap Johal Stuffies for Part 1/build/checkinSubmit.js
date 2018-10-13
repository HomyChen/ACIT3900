/**
 * Created by japjohal on 2018-10-05.
 * would like to take addning to table functions and make them one function
 */
$(document).ready(function() {
    // input of user Info
    var lastNameInput = document.getElementById("lnInp");
    var firstNameInput = document.getElementById("fnInp");
    var homePhoneInput = document.getElementById("hpInp");
    var cellPhoneInput = document.getElementById("cpInp");
    var streetInput = document.getElementById("stInp");
    var cityInput = document.getElementById("ctInp");
    var postalCodeInput = document.getElementById("pcInp");

    // Input for vehicle info
    var vinInput = document.getElementById("vinInp");
    var yearInput = document.getElementById("yrInp");
    var makeInput = document.getElementById("makeInp");
    var modelInput = document.getElementById("modelInp");
    var licenseInput = document.getElementById("lpInp");
    var odoInput = document.getElementById("oiInp");
    var vehicleNotesInput = document.getElementById("vnInp");
    var divToAppendCommonRequests = document.getElementById("dropDownAppended");

    // Buttons
    var submitButton = document.getElementById("submitBut");
    var serviceReqBtn = document.getElementById("addBut");
    var otherSerRequest = document.getElementById("OtherServiceReqBut");

    //Misc
    var tBody = document.getElementById("requestTableBody");
    var otherTBody = document.getElementById("otherRequestTableBody");
    var otherSerTextArea = document.getElementById("otherRequestsInp");

    // these two are the variables in table row
    var tableRows = 1;
    var tableRowsOther = 1;
    // these two are to keep track of num of requests made
    var numOfUnCommonRequests = 0;
    var numOfCommonRequests = 0;
    var requestsPackaged;

    /*------Used for existing customer ID // Vehicle ID ----------------------------------*/
    var cust_id = null;
    var vehicle_id = null;
    /*-----------------------------------------------------------------------------------*/

    getCommonRequests();

    /*------ This is where the major changes happen-----------------------------------------------------*/
    submitButton.onclick = function() {
        var commonTasksSelect = document.getElementById("requestsDropdown");
        validate = requireValidation(lastNameInput.value, vinInput.value, numOfUnCommonRequests, numOfCommonRequests, cust_id, vehicle_id)
        if (validate.status === true) {

            /*------- Old Code, Change If Required--------------------------------------------------------------*/
            packageRequests();

            $.ajax({
                url: "/data/insertCustomer",
                type: "post",
                data: {
                    lastName: lastNameInput.value,
                    firstName: firstNameInput.value,
                    homePhone: homePhoneInput.value,
                    cellPhone: cellPhoneInput.value,
                    street: streetInput.value,
                    city: cityInput.value,
                    postalCode: postalCodeInput.value,
                    dataGram: {
                        vin: vinInput.value,
                        year: yearInput.value,
                        make: makeInput.value,
                        model: modelInput.value,
                        license: licenseInput.value,
                        odometer: odoInput.value,
                        vehicleNotes: vehicleNotesInput.value
                    },
                    requests: requestsPackaged,

                },
                success: function(data) {
                    if (data.status == 1) {
                        console.log("added data to DB. File: checkInSubmit line 58");
                    } else {
                        alert("error");
                    }
                }
            })

            /*------- End of Old Codes--------------------------------------------------------------------------------*/
        } else {
            if (validate.error.includes("Last Name Error")) {
                lastNameInput.style.borderColor = 'red'
            }
            if (validate.error.includes("VIN Error")) {
                vinInput.style.borderColor = 'red'
            }
            if (validate.error.includes("No Request")) {

                commonTasksSelect.style.borderColor = 'red'
                otherSerTextArea.style.borderColor = 'red'
            }
        }
    }
    /*---------------------------------------------------------------------------------------------------------*/

    serviceReqBtn.onclick = function() {
        // adding service requests to the table dynamically
        // using tableRows to dynamically change the number of elements in the table
        var commonTasksSelect = document.getElementById("requestsDropdown");

        var th = document.createElement("th");
        var td = document.createElement("td");
        var tr = document.createElement("tr");
        var serviceRequestText = commonTasksSelect[commonTasksSelect.selectedIndex].innerHTML.toString();

        th.scope = "row";
        th.innerHTML = tableRows++; //Table rows is the number that is added to the table hence it starts at 1
        td.innerHTML = serviceRequestText;
        numOfCommonRequests++; // service requests are at 0.
        td.title = commonTasksSelect[commonTasksSelect.selectedIndex].value.toString();
        tr.appendChild(th);
        tr.appendChild(td);

        tBody.appendChild(tr);
    };

    otherSerRequest.onclick = function() {
        // would like to make this same as serviceReqBtn function
        var th = document.createElement("th");
        var td = document.createElement("td");
        var tr = document.createElement("tr");
        var otherServiceRequestText = otherSerTextArea.value;

        th.scope = "row";
        th.innerHTML = tableRowsOther++; //Table rows is the number that is added to the table hence it starts at 1
        td.innerHTML = otherServiceRequestText;
        numOfUnCommonRequests++; // service requests are at 0.

        tr.appendChild(th);
        tr.appendChild(td);
        otherTBody.appendChild(tr);
    };

    function packageRequests() {
        // this is where when submit is hit all data in table is packaged up
        var i, z;
        var obj = { commonRequestsTotal: numOfCommonRequests, commonRequests: [], otherReqTotal: numOfUnCommonRequests, otherRequests: [] }; // not sure if there is a better way to do this?

        for (i = 0; i < numOfCommonRequests; i++) {
            obj.commonRequests.push(tBody.rows[i].childNodes[1].title); // cant get value have to use innerHTML
        }

        console.log(numOfUnCommonRequests);
        for (z = 0; z < numOfUnCommonRequests; z++) {
            obj.otherRequests.push(otherTBody.rows[z].childNodes[1].innerHTML);
        }

        requestsPackaged = obj;
        console.log(requestsPackaged);
    }

    function getCommonRequests() {
        $.ajax({
            url: "/pages/requestDropdown.html",
            dataType: "html",
            success: function(resp) {
                divToAppendCommonRequests.innerHTML = resp;
            }
        });
    }

    /*------Some styling Changes-------------------------------------------------------------------------------------------------------*/

    vinInput.onclick = () => {
        vinInput.style.borderColor = '#ccc';
    }

    lastNameInput.onclick = () => {
        lastNameInput.style.borderColor = '#ccc';
    }
    otherSerTextArea.onclick = () => {
        otherSerTextArea.style.borderColor = 'darkgrey';
    }
    setTimeout(() => {
        document.getElementById("requestsDropdown").onclick = () => {
            document.getElementById("requestsDropdown").style.borderColor = 'darkgrey';
        }
    }, 1000)

    /*---------------------------------------------------------------------------------------------------------------------------------*/
});