// var SerialPort = require("serialport");
//
// const parsers = SerialPort.parsers;
// const parser = new parsers.Readline({
//     deliner: '\r\n'
// });
//
// var port = new SerialPort('/dev/cu.usmodem14202', {
//     baudRate: 9600,
//     dataBits: 8,
//     parity: 'none',
//     stopBits: 1,
//     flowControl: false
// });
//
// port.pipe(parser);
//
// parser.on('data', function(data){
//     console.log(data);
// });
//
// console.log("hello world");
//

//testing github push

// Import SerialPort and ReadlineParser
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
let WebSocketServer = require('ws').Server;
// Get the port name from the command line
let portName = '/dev/tty.usbmodem14202';

// Create a new instance of SerialPort
let myPort = new SerialPort({ path: portName, baudRate: 9600 });


// Instantiate a ReadlineParser
const parser = myPort.pipe(new ReadlineParser({ delimiter: '\r\n' }));

// Event listener for incoming data
parser.on('data', console.log);

function showPortOpen() {
  console.log('port open. Data rate: ' + myPort.baudRate);
}

function readSerialData(data) {
  console.log(data);
}

function showPortClose() {
  console.log('port closed.');
}

function showError(error) {
  console.log('Serial port error: ' + error);
}
//myPort.write("Hello");
const SERVER_PORT = 8081;               // port number for the webSocket server
let wss = new WebSocketServer({port: SERVER_PORT}); // the webSocket server
let connections = new Array;          // list of connections to the server
wss.on('connection', handleConnection);

function handleConnection(client) {
  console.log("New Connection"); // you have a new client
  connections.push(client); // add this client to the connections array

  client.on('message', sendToSerial); // when a client sends a message,

  client.on('close', function() { // when a client closes its connection
    console.log("connection closed"); // print it out
    let position = connections.indexOf(client); // get the client's position in the array
    connections.splice(position, 1); // and delete it from the array
  });
}
