const express = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
	destination: './public/uploads/',
	filename: function(req, file, cb){
		cb(null, file.fieldname + '-' + Date.now() + '.jpg')
	}
})

const upload = multer({ storage: storage }).single('uplaod');

const app = express();

const port = process.env.PORT || 80

app.use(express.static(__dirname + "/src"))

app.get("/", (request, response) => {
    response.sendFile(__dirname + "/test_upload.html")
})

app.post("/upload",(request, response)=>{
	upload(request, response, (error)=>{
		if(error){
			response.send("stuff")
			console.log(err)
		}
		console.log(request.file)
		response.send("stuff test")

	})
})
app.listen(port, (err) => {
    if (err) {
        console.log('Server is down');
        return false;
    }
    console.log('Server is up');
})