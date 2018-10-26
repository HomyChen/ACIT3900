const { Pool, Client } = require('pg');

var dbURL = process.env.DATABASE_URL || "postgres://postgres:password@localhost:5432/sot"; //Change According to Database Requirements


const pgpool = new Pool({
    connectionString: dbURL,
});

/*
var getSearchData = (searchQuery, searchType) => {
    return new Promise((resolve, reject) => {
    	if (searchType == 'last_name'){
    		pgpool.query('SELECT customer.cust_id AS cust_id, vehicle_id, last_name, first_name, model, license FROM customer RIGHT JOIN vehicle ON customer.cust_id = vehicle.cust_id WHERE last_name LIKE $1 union select customer.cust_id AS cust_id, null as vehicle_id, last_name, first_name, null as model, null as license from customer where last_name like $1', [searchQuery + '%'] , (err, res) => {
	            if (err) {
	                reject(err)
	            } else {
	                resolve(res.rows)
	            }
	        })
    	} else if (searchType == 'license_number'){
            pgpool.query('SELECT customer.cust_id AS cust_id, vehicle_id, last_name, first_name, model, license FROM customer RIGHT JOIN vehicle ON customer.cust_id = vehicle.cust_id WHERE license LIKE $1', [searchQuery + '%'] , (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res.rows)
                }
            })
        } else if (searchType == 'VIN'){
            pgpool.query('SELECT customer.cust_id AS cust_id, vehicle_id, cust_id, vehicle_id, last_name, first_name, model, license FROM customer RIGHT JOIN vehicle ON customer.cust_id = vehicle.cust_id WHERE vin LIKE $1', [searchQuery + '%'] , (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res.rows)
                }
            })
        } else {
            reject('Invalid searchType')
        }
    })
}

var getExactSearchData = (searchQuery, searchType) => {
    return new Promise((resolve, reject) => {
        if (searchType == 'last_name'){
            pgpool.query('SELECT customer.cust_id AS cust_id, vehicle_id, last_name, first_name, model, license FROM customer RIGHT JOIN vehicle ON customer.cust_id = vehicle.cust_id WHERE last_name LIKE $1 union select customer.cust_id AS cust_id,null as vehicle_id, last_name, first_name, null as model, null as license from customer where last_name = $1', [searchQuery] , (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res.rows)
                }
            })
        } else if (searchType == 'license_number'){
            pgpool.query('SELECT customer.cust_id AS cust_id, vehicle_id, last_name, first_name, model, license FROM customer RIGHT JOIN vehicle ON customer.cust_id = vehicle.cust_id WHERE license = $1', [searchQuery] , (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res.rows)
                }
            })
        } else if (searchType == 'VIN'){
            pgpool.query('SELECT customer.cust_id AS cust_id, vehicle_id, last_name, first_name, model, license FROM customer RIGHT JOIN vehicle ON customer.cust_id = vehicle.cust_id WHERE vin = $1', [searchQuery] , (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res.rows)
                }
            })
        } else {
            reject('Invalid searchType')
        }
    })
}
*/

/* Changed Functions -Homy Oct 12, 2018*/
var getSearchData = (searchQuery, searchType) => {
    return new Promise((resolve, reject) => {
    	if (searchType == 'last_name'){
    		pgpool.query('SELECT * FROM customer WHERE last_name LIKE $1', [searchQuery + '%'] , (err, res) => {
	            if (err) {
	                reject(err)
	            } else {
	                resolve(res.rows)
	            }
	        })
    	} else if (searchType == 'license_number'){
            pgpool.query('SELECT * FROM customer INNER JOIN vehicle ON customer.cust_id = vehicle.cust_id WHERE license_plate LIKE $1', [searchQuery + '%'] , (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res.rows)
                }
            })
        } else if (searchType == 'VIN'){
            pgpool.query('SELECT * FROM customer INNER JOIN vehicle ON customer.cust_id = vehicle.cust_id WHERE vin LIKE $1', [searchQuery + '%'] , (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res.rows)
                }
            })
        } else {
            reject('Invalid searchType')
        }
    })
}

module.exports = {
	getSearchData,
    //getExactSearchData
}