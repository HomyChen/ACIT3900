const express = require("express");
const ejsEngine = require('ejs-locals');
const bodyParser = require("body-parser");


/*Seperated the server routes from the database commands*/
const dbfun = require('./private/databaseFunctions.js')

var app = express();


app.engine("ejs", ejsEngine);
app.set("view engine", "ejs");



const port = process.env.PORT || 80



app.use(express.static(__dirname + "/src"));



app.use(bodyParser.urlencoded({
    extended:true
}));


app.get("/", (request, response) => {
    response.sendFile(__dirname + "/search_page_mobile2.html")
})

app.get("/newcar", (request, response)=>{
	response.send("The vehicle check-in page")
})

app.post("/search", (request,response)=>{
	dbfun.getExactSearchData(request.body.searchQuery, request.body.searchType).then((result)=>{
		response.send({status: 'OK', data: result})
	})
})

app.post("/submit", (request,response)=>{
	console.log(request.body)
	response.send({status: 'OK', data: null})
})

app.get("/oldcar", (request, response)=>{
	response.send("The vehicle check-in page")
})

app.listen(port, (err) => {
    if (err) {
        console.log('Server is down');
        return false;
    }
    console.log('Server is up at ' + port);
})