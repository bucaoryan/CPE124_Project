//import library
const express = require("express");
var app = express()
const path = require("path")
const port = 3000

var webserver = require('./routes/webserver');

const { spawn } = require('child_process');

const childPython = spawn('python', ['slp_sourcecode.py']);

childPython.stderr.on('data', (data) => {
    console.error('There was an error: ${data}');
});

childPython.on('close', (code) => {
    console.log('child process exited with code ${code}');
});


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
