/**
 * Created by japjohal on 2018-10-05.
 */
var express = require('express');
var router = express.Router();
const pg = require('pg');

const config = {
    user: 'postgres',
    database: 'sot',
    password: 'thegreatpass',
    port: 5432
};
const pool = new pg.Pool(config);

router.post("/data",function (req,resp) {
    // i dont think this is needed
    console.log(req.body);
    resp.send("Hello")
})


router.post("/insertCustomer",function (req,resp) {
    console.log(req.body);
    // start of prepared Data
    var query = 'INSERT INTO customer (first_name, last_name, home_phone, cell_phone, street, city, postal_code, date_added)' +
                'VALUES ($1,$2,$3,$4,$5,$6,$7,$8) returning cust_id';
    var data = [req.body.firstName,req.body.lastName,req.body.homePhone,req.body.cellPhone,req.body.street,req.body.city,req.body.postalCode,"2018-01-01"];
    // End of prepared data

    pool.connect(function (err, client, done) {
        if (err) console.log("Can not connect to the DB" + err);

        client.query(query,data,
            function (err, result) {
                done();
                if (err) {
                    console.log(err.message);
                    resp.send(null);
                }
                else {
                    // only if data entry is sucessful for customer do we enter a vehicle.note using array to send vehicle data and customer id. Also using callback
                    insertVehicles([req.body.dataGram,result.rows[0]],function (result) {
                        if(result.status == 1){
                            getServiceRequestID(req.body.requests); // need to change this to callback
                        }
                    })
                }
            }
        )
    })
});

function insertVehicles(info, callback) {

    // Start of prepared data
    var query ='INSERT INTO vehicle (vin, year, license, make, model, color, date_added, cust_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) returning vehicle_id ';
    var data = [info[0].vin, parseInt(info[0].year), info[0].license, info[0].make, info[0].model, info[0].color,"2018-01-01",info[1].cust_id];
    // end of prepared data

    pool.connect(function (err, client, done) {
        if (err) console.log("Can not connect to the DB" + err);

        client.query(query,data,
            function (err, result) {
                done();
                if (err) {
                    console.log(err);
                    callback({status:0});
                }
                else {
                    callback({status:1});// will probaly need to pass back the vehicle_id later
                }
            }
        )
    })
}

function getServiceRequestID(info) {
    var variablesNeeded = [];

    for(var i = 0; i< info.commonRequestsTotal; i++){
        variablesNeeded.push('(task_id = $'+(i+1)+')');
    }
    var query = 'Select task_id, task_name from task where'+ variablesNeeded.join(' OR ');

    pool.connect(function (err, client, done) {
        if (err)  console.log("Can not connect to the DB" + err)

        client.query(query,info.commonRequests,
            function (err, result) {
                done();
                if (err) {
                    console.log("Error in Service request entry function");
                    console.log(err);

                }
                else {
                    console.log(result.rows)
                }
            }
        )
    })
}



module.exports = router;