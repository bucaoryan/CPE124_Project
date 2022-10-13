//import library
const express = require("express");
var app = express()
const path = require("path")
const port = 3000
var Gpio = require('onoff').Gpio;
const pir = new Gpio(20, "in", "both"); //
const {spawn} = require('child_process')
var webserver = require('./routes/webserver');

//routes    
app.use(express.static(path.join(__dirname, 'frontend')));
app.use("/", webserver);

//call python script (slp_sourcecode.py) for the system
function runScript(){
    return spawn('python', [
        "-u",
        path.join(__dirname, 'slp_sourcecode.py')
    ]);
}

pir.watch((err,value)=>{
    if (err) exit();
    console.log('Pumping Alcohol')
    runScript()
})

function exit(err) {
  if (err) console.log("An error occurred: " + err);
  pir.unexport();
  console.log("Bye, bye!");
  process.exit();
}

process.on("SIGINT", exit);

//print output of script
const subprocess = runScript()

subprocess.stdout.on('data', (data) => {
  console.log(`data:${data}`);
});

subprocess.stderr.on('data', (data) => {
  console.log(`error:${data}`);
});

subprocess.on('close', () => {
  console.log("Closed");
});

app.listen(port, function () {
    console.info("Web App: http://localhost:%s", port);
});

const ipAdd="ENTER YOUR IP HERE";

app.listen(port, ipAdd || "localhost" ,() => {
    console.log(`For Mobile Phone: http://${ipAdd}:${port}`);
});



  
