const express = require('express')
const app = express()

var htmlpdf = require("./htmlpdf.js")

app.use(express.static(__dirname + "/src"))

app.get("/",(req, res) =>{
	res.sendFile(__dirname+"/hello.html")
})

app.get("/result", (req, res) => {
	data = {
		repair_order: 1,
		promised_time: "End of Time",
		first_name: "Fuck",
		last_name: "Worthy",
		home_phone: "(123) 123-1234",
		cell_phone: "(123) 123-1234",
		vin: "1234567890ASDFGHJ",
		year: "1984",
		make: "Ford",
		model: "M150",
		license_plate: "EBR333",
		work_task: [
		{task_name: "Oil Change"},
		{task_name: "Oil Change"},
		{task_name: "Oil Change"},
		{task_name: "Oil Change"},
		{task_name: "Oil Change"},
		{task_name: "Oil Change"},
		{task_name: "Oil Change"},
		{task_name: "Oil Change"},
		{task_name: "Oil Change"},
		{task_name: "Oil Change"},
		{task_name: "Oil Change"},
		{task_name: "Oil Change"},
		{task_name: "Oil Change"},
		{task_name: "Oil Change"},
		{task_name: "Oil Change"},
		{task_name: "Oil Change"},
		{task_name: "Oil Change"},
		{task_name: "Oil Change"},
		{task_name: "Oil Change"},
		{task_name: "Oil Change"}
		]
	}
    htmlpdf.createPDF(data).then((result) => {
        res.writeHead(200, {
            'Content-Type': 'application/pdf',
        });

        res.end(result);
    })
})

app.listen(3000, (err) => {
    if (err) {
        console.log(err)
    }
    console.log("Run, server, run")
})