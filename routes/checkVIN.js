const { Pool, Client } = require('pg');

var dbURL = process.env.DATABASE_URL || "postgres://postgres:thegreatpass@localhost:5432/sot"; //Change According to Database Requirements


const pgpool = new Pool({
    connectionString: dbURL,
});

var checkVIN = function(VIN){
    return new Promise((resolve, reject) => {
        
        pgpool.query('SELECT VIN FROM vehicle WHERE VIN LIKE $1', [VIN] , (err, res) => {         
            if (err) {
                reject(err)
            } else {
                console.log(res.rows);
                if(res.rows.length == 0){
                    resolve({status: "VIN not in Database"})
                }else{
                    reject({status: "VIN in Database"})
                }
            }
        })
    })
}

module.exports = {
	checkVIN
}