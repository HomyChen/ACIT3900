# OPUD
BCIT School of Transportation Project F18-013

## Introduction to Opud
Opud is a web application commissioned by Naveen Jit from the BCIT School of Transportation. It designed to be used by the customer support representative working for the School of Transportation. 

Its main function is to allow the support representative to enter customer and vehicle information into a database and create a printable repair order which will be sent to the school’s automotive shop. A technician will then fill out the repair order and give it back to the customer support representative so that the information on the tasks done to the vehicle can be entered into the database.

This application is currently a work-in-progress, and the main function still left to be implemented is the ability to add information on parts used for each repair order and to generate a printable invoice from the data on each repair order. This application is also intended to be hosted on BCIT’s own servers.

## Database Structure
The database used for this application is PostgreSQL 9.6.

Please click here for the: [Database Entity Relationship Diagram](Database_ERD.png)

### Tables:

#### Customer

Stores only customer data.

#### Vehicle

Stores vehicle data with cust_id linking back to Customer table.
Unused columns: 
```
•	 Body
•	 Style
•	 Color
```

#### Repair_Order

Stores information on each repair order. Tied to `Vehicle` table at `Vehicle_ID`. Column `Status` refers to the repair order being either open (`false`) or closed (`true`). Default for `Status` is `false`.

#### Repair Tasks

Stores the data for individual tasks within each repair order. A repair order could have a number of different tasks. Each row represents an instance of a particular task in the `Task` table.

#### Unused Columns:
```
•	 Labor_hrs
•	 Labor_rate
```

#### Task

Represents the categories of different tasks that can be done. For common tasks listed in the Common Requests dropdown on the Vehicle Check-In page, data needs to be inserted into this table using the database initialization script when the database is first set up. The same `Task_ID` for a common task may be found multiple times in the `Repair_Tasks` table.

Uncommon (user inputted) tasks will be added to this table when inputted in the Uncommon Tasks input field in the Vehicle Check-In page. Each uncommon task `Task_ID` will only appear once in the `Repair_Tasks` table.

#### Parts

This table is currently unused. It will store the data for the parts used for each task in `Repair_Tasks`. This will be used in addition to `Labor_hrs` and `Labor_rate` to calculate the cost of each task when generating an invoice (currently not implemented).

## Search Page Documentation

The Search Page is what the user will see first when they try to access Vehicle Check-In. It allows them to search for existing customers and select the vehicle data in order to fill out the Vehicle Check-In page with pre-existing data. This is also the only way to create a new order for an existing customer.

### Assumptions:

This is the page that the user sees when they try to access Vehicle Check-In. It allows them to quickly search for information on a returning customer or click the New Customer Check-In button.

This page is injected into the Vehicle Check-In Page through AJAX. Users should only be able to access this through the normal link to the Vehicle Check-In page.

### Prerequisites:

DataTables API script and CSS (Linked in search.html)
Bootstrap API script and CSS (Linked in search.html)
JQuery (Linked in checkin.html)

### Related Files:
•	search.html

•	search_page.css

•	searchFunctions.js

•	search_overlay.js

•	search_page.js

•	index.js

•	checkin.html

#### search.html

This is the html file for the search page. The head element contains links to the dependencies Bootstrap and DataTables API along with `search_page.css` and `search_page.js`.

Note that while JQuery is also a dependency, it is linked in checkin.html instead of this file. This is because this file (`search.html`) is placed into `checkin.html` when the Vehicle Check-In page is loaded. Loading JQuery scripts twice in one page is known to cause issues with the DataTables API, so it is only loaded in the `checkin.html` file.

The layout of elements in this file (and all others in this project) is determined by Bootstrap classes.

#### search_page.css

This is the stylesheet for `search.html`.

#### searchFunctions.js

This is the server-side script for running the database query that will populate the table in the search page.

##### Functions:
`getSearchData()`

Parameters: searchQuery, searchType

Returns: JSON object {status, data}

Purpose:
- This function takes in the values from the search input box, searchQuery, and the type of search, searchType, from the dropdown to run a database query that returns a JSON object with a status and data containing all customer and vehicle information from the Customer and Vehicle tables in the database which match searchQuery.
  
- Before the database query is run, searchQuery is checked against a regex to ensure that it only contains letters and numbers.
- This function is exported by this file to be used in index.js when an AJAX call is made using the search button.


#### search_overlay.js

This is the client-side script containing the function which executes the AJAX call to inject search.html into checkin.html. The reason this is done is to pass data quickly between the Search Page and Vehicle Check-In Page, as they will essentially act as one page.

#### Functions:

`getSearchPage()`
Parameters: None.

Returns: search.html, placed into the <div> element with id = “searchPosition”
  
Purpose:
- Injects search.html into checkin.html to allow for search data to be passed effectively to the input forms in checkin.html so that the inputs can auto-fill.
- This function is run automatically when the script is loaded by checkin.html.
  
#### search_page.js

This page contains the main scripts for the functionality of the elements in search.html.

#### Functions:

`search_button function (Event Listener for click)`

Parameters: searchQuery, searchType

Returns: Row data to populate the DataTable, or alert saying search should not contain special characters.

Purpose:
- Runs when the search button is clicked.
- Has an AJAX call to send the values in the search input field and the search type from the dropdown to the server so that getSearchData() in searchFunctions.js can be run.
- Initializes the DataTable and displays the search results in the DataTable.
- The Table only displays Last Name, First Name, Cell Phone, Model, License Plate, and VIN, but all other columns are still received by the client.
- Adds an on-select function to the rows in the DataTable for the row’s data to be passed to the Vehicle Check-In Page when either the Select Customer Only button or the Select Customer + Vehicle button is clicked.

`ajaxSetVariables()`
Parameters: status, vehicle_id, cust_id

Returns: None

Purpose:
- Sets the session variables for status
  - § Status variable determines which scenario is taking place:
    - 0: New Customer, New Vehicle
    - 1: Existing Customer, New Vehicle
    - 2: Existing Customer, Existing Vehicle
  - §  Status variable is then used by functions in the Vehicle Check-In Page to determine what kind of data entry occurs when Submit button is clicked.
- Sets the session variables for vehicle_id and cust_id so that it can be used in the Vehicle Check-In Page if status is 1 or 2.
- This function is run automatically when page loads to set status to 0 and vehicle_id and cust_id to null. This defaults the scenario to New Customer, New Vehicle until the user makes a search and selects and existing customer/vehicle.


`makeCheckInVisible()`
Parameters: None

Returns: None

Purpose:
- Sets the entirety of search.html invisible and makes the elements of checkin.html visible.
- Used when any of the three buttons that leads the user to the Vehicle Check-In Page is clicked.

`makeSearchVisible()`
Parameters: None

Returns: None

Purpose:
- Sets the entirety of checkin.html invisible and makes the elements of search.html visible.
- Used when user clicks the Existing Customer button in the Vehicle Check-In Page.

`autofillCustomer()`
Parameters: data

Returns: None

Purpose:
- Takes in the row data from the DataTable and fills Customer Information on the Vehicle Check-In Page with this data.
- Used when user clicks Select Customer or Select Customer + Vehicle

`autofillVehicle()`
Parameters: data

Returns: None

Purpose:
- Takes in the row data from the DataTable and fills Vehicle Information on the Vehicle Check-In Page with this data.
- Used when user clicks Select Customer + Vehicle
 
`clearCustomer()`
Parameters: None

Returns: None

Purpose:
- Clears the data that was filled with autofillCustomer()

`clearVehicle()`
Parameters: None

Returns: None

Purpose:
- Clears the data that was filled with autofillVehicle()


## Vehicle Check-In Documentation

### Assumption: 
- User has already chosen one of the following three options:
  - New Customer New Vehicle
  - Old Customer Old Vehicle
  - Old Customer New Vehicle

For simplicity we will call the page to the right the vehicle check in page(VCP). The VCP is the main source of data for the application. 

### Pre-Requisites:
- As previously mentioned, when you are on this page a status variable has been set
- The status has been set in search_page.js file
- When the VCP loads it checks this status and pre fills, if any, the input fields if appropriate
- The HTML for this page can be found in the public folder
  - checkin.html
  - requestDropDown.html
  
### javaScript for VCP:

The majority of all functionality is provided by the checkInSubmit.js file. This page takes information present on the form and inserts it into the database. At the top of the JS file all input fields have a variable assigned to them. 

In the preceding section we will discuss each function:

`loadBasics()`
Parameters: None

Return: None

Purpose: 
- Load requests dropdown select. 
- The values for the select are located in requestsDropDown.html
  - They are grabbed with a ajax call and append to select
  - Requests are kept in separate file to make changes quicker and easier
  - Note: 
    - If any changes are made to this file corresponding changes need to be made to database creation script
    - Note: How its value is one and it is the first insertion into table
- Remainder of function assigns values to button clicks

`vinCheck:`
Parameters: None

Return: 1 or 0

Purpose:
- checkVIN.js queries the DB to see if the VIN is already present
- every car has a unique VIN so in the DB it has a unique constraint
- If VIN is present a sweetAlert is used to tell user that they entered a VIN that is already in DB. 
  - Returns a 1
- If VIN is not present.
  - Returns a 0
  
