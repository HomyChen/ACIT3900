/*
* Database queries for the repair order page
*/

var express = require('express');
var router = express.Router();
const pg = require('pg');

const config = {
    user: 'postgres',
    database: 'sot',
    password: 'password',
    port: 5432
};

const pool = new pg.Pool(config);

router.post("/rosearch",function (req,resp) {
    console.log(req.body);
    resp.send("Hello")
})

// query database based on user search parameters
router.post("/AroSearch", function (req,resp){
    
    var roSearchWord = req.body.roSearchWord;
    var searchBy = req.body.roSearchBy;
    var roStatus = req.body.roStatus;
    
    console.log(roSearchWord);
    console.log(searchBy);
    console.log(roStatus);
    
    var roQuery = 'SELECT * FROM customer c INNER JOIN vehicle v ON c.cust_id = v.cust_id INNER JOIN repair_order ro ON ro.vehicle_id = v.vehicle_id where ' + searchBy + '= $1';
    
    var data = [req.body.roSearchWord];
    
    pool.connect(function (err, client, done){
        if (err) {
            console.log("Unable to connect to the database: " + err );
        }
        else{
            console.log("Successfully login to database!")
        }
        
        client.query(roQuery, data, function(err, result){
            done();
            if(err){
                console.log(err.message);
                resp.send(null);
            }
            else{
                console.log(result.rows);
                resp.send(result.rows);
                
                
                /*
                $('#resultsTable').bootstrapTable('load', searchData());
                
                function searchData(){
                rows = [];
                
                for (var i = 0; i < result.rows.length; i++) {
                    
                    rows.push({
                        ro: result.rows[i].ro_id,
                        license: result.rows[i].license,
                        lastname: result.rows[i].last_name,
                        status: result.rows[i].status
                    });
                }
                return rows;
                
                }*/
            }
        })
    })
});


module.exports = router;