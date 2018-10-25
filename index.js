const exp = require("express");
const port = process.env.PORT || 10000;
const path = require("path");
const bodyParser = require("body-parser");

//require session
//const session = require("express-session");

var pF = path.resolve(__dirname, "public");
var app = exp();

//create a new server for socket, but combine it with express functions
const server = require("http").createServer(app);

//create a socket server with the new server
var io = require("socket.io")(server);

//database
var dbFunctions = require("./routes/dbFunctions");
var roFunctions = require("./routes/roFunctions");

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use("/scripts", exp.static("build"));
app.use("/css", exp.static("style"));
app.use("/pages",exp.static("public"))

app.use(bodyParser.urlencoded({
    extended:true
}));
app.get("/", function(req, resp){
    resp.sendFile(pF+"/checkin.html")
});

app.use("/data",dbFunctions);
app.use("/rosearch", roFunctions);

//use sessions
/*app.use(session({
    secret:"",
    resave:true,
    saveUninitialized:true
}));
*/

/*app.get("/", function(req, resp){
    if(req.session.user){
        resp.sendFile(pF+"/item.html")
    }else{
        resp.sendFile(pF+"/login.html");
    }
});
*/

server.listen(10000, function(err){
    if(err){
        console.log(err);
        return false;
    }
    
    console.log(port+" is running");
});


app.get("/menu", function(req, resp){
    resp.sendFile(pF+"/menu.html")
});

app.get("/orders", function(req, resp){
    resp.sendFile(pF+"/ro.html")
});
