//import library
const express = require("express");
var app = express()
const path = require("path")
const port = 3000

var webserver = require('./routes/webserver');

// another way of opening html file in nodejs
// app.use(express.static(__dirname+'/frontend'));
// app.get("/", function(req,res){
//   res.sendFile(
//     path.join(__dirname,"/frontend/web.html")
//   );
// });

//routes
app.use(express.static(path.join(__dirname, 'frontend')));
app.use("/", webserver);

app.listen(port, () => console.log(`Web App listening on port 
${port}!`))