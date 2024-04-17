//--------suggestion from chatGPT to use socket.io
let textDisplay;        // variable for the text div you'll create
let socket = io();  // Automatically connect to the host that serves the page
let soilData = "waiting for soil data...";
function setup() {
  // Make a new div and position it at 10, 10
  //text = createDiv("Sensor reading:");
  //text.position(10, 10);
  createCanvas(400,400);

  // Handle incoming messages
  socket.on('data', function(data) {
    // Assuming data is directly the value to be displayed
    //console.log(data);
    //fill('black');
    //soilData = data;
  //  text.html("Sensor reading: " + data);
    xPos = parseInt(data);  // Ensure your data can be parsed as an integer
    soilData = data.trim();  // Use trim() to remove any unwanted whitespace
  //  ellipse(100,100, xPos);
    //text.position(xPos, 10);    // Position the text
  });
}
//need to convert the serial monitor data to only display the integer value (not "soil moisture")
//so that we can parse that data as an integer
function draw(){
  background(0);
  fill('white');
  ellipse(50, 50, 80, 80);
  fill("pink");
  textAlign(CENTER, CENTER);  // Align text to be centered in the ellipse
 textSize(16);               // Set text size

 textDisplay = text(soilData, 50, 50);
//  text.html("Sensor reading: " + soilData);
  console.log(soilData);
}
