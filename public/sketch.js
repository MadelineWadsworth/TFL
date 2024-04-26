//--------suggestion from chatGPT to use socket.io
let textDisplay;        // variable for the text div you'll create
let socket = io();  // Automatically connect to the host that serves the page
let soilData = "waiting for soil data...";
function setup() {
  // Make a new div and position it at 10, 10
  //text = createDiv("Sensor reading:");
  //text.position(10, 10);
   createCanvas(windowWidth, windowHeight);

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
  background(109, 135, 112);
  textSize(45);
  fill(255)
  text("Root Radar", 20, 60)
  textAlign(CENTER, CENTER);

  textSize(25);
  fill(255)
 textDisplay = text("Soil Moisture: " + soilData, 120, 120);
//  text.html("Sensor reading: " + soilData);
  console.log(soilData);
}
