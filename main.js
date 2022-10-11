//import library
const express = require("express");
var app = express()
const path = require("path")
const port = 3000
var socket = require("socket.io");
var webserver = require('./routes/webserver');
//var Gpio = require('onoff').Gpio;
//const pir = new Gpio(27, "in", "both"); //pin 27 pir

// another way of opening html file in nodejs
// app.use(express.static(__dirname+'/frontend'));
// app.get("/", function(req,res){
//   res.sendFile(
//     path.join(__dirname,"/frontend/web.html")
//   );
// });

//initialize server
const server = app.listen(port, function () {
    console.info("Web App: http://localhost:%s", port);
});

//routes
app.use(express.static(path.join(__dirname, 'frontend')));
app.use("/", webserver);

//call python script (slp_sourcecode.py) for the system
const { spawn } = require('child_process');

const childPython = spawn('python', ['slp_sourcecode.py']);

childPython.stderr.on('data', (data) => {
    console.error('There was an error: ${data}');
});

childPython.on('close', (code) => {
    console.log('child process exited with code ${code}');
});

// initiale socket.io 
const io = socket(server); 
var totalCount = 50;
var numberOfPumps = 15;
var measurement_ml = 450;

io.on("connection",(socket) => {
    console.log('new connection:'+socket.id);
    // pir.watch(function(err, value) {
    //     if (err) exit();
    //     if (value == 1){
    //         console.log('SYSTEM ACTIVATED')
    //         //totalCount++;
    //     } else {
    //         console.log('NO MOTION DETECTED')
    //     }
        // console.log(value ? "SYSTEM ACTIVATED." : "NO MOTION DETECTED.");    
        // totalCount++; 
        // console.log(totalCount) 
    //});     
    io.emit("message", totalCount)
    socket.on("disconnect", () =>{
        console.log('disconnected');
    })
})
