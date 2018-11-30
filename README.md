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





