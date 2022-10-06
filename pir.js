var Gpio = require("onoff").Gpio;
const pir = new Gpio(27, "in", "both"); //pin 27 pir

pir.watch(function(err, value) {
  if (err) exit();

  console.log(value ? "SYSTEM ACTIVATED." : "NO MOTION DETECTED.");

  if (value == 1) require("./mailer").sendEmail();

});
function exit(err) {
  if (err) console.log("An error occurred: " + err);
  sensor.unexport();
  console.log("Bye, bye!");
  process.exit();
}
process.on("SIGINT", exit);
