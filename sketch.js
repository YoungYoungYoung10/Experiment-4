// The serviceUuid must match the serviceUuid of the device you would like to connect
const serviceUuid = "19b10010-e8f2-537e-4f6c-d104768a1214";
let myCharacteristic;
let latestData = 'nothing yet';
let myBLE;

function setup() {
  createCanvas(1000,1000);
  // Create a p5ble class
  myBLE = new p5ble();
  
  textSize(20);
  textAlign(CENTER, CENTER);

  // Create a 'Connect' button
  const connectButton = createButton('Connect')
  connectButton.position(45, 45);
  connectButton.mousePressed(connectToBle);
}

function connectToBle() {
  // Connect to a device by passing the service UUID
  myBLE.connect(serviceUuid, gotCharacteristics);
}

// A function that will be called once got characteristics
function gotCharacteristics(error, characteristics) {
  if (error) console.log('error: ', error);
  console.log('characteristics: ', characteristics);
  myCharacteristic = characteristics[0];
  // Read the value of the first characteristic
  myBLE.read(myCharacteristic, gotValue);
}

// A function that will be called once got values
function gotValue(error, value) {
  if (error) console.log('error: ', error);
  console.log('value: ', value);
  latestData = value;
  // After getting a value, call p5ble.read() again to get the value again
  myBLE.read(myCharacteristic, gotValue);

}

function draw() {
  // let yyds = map(LatestData,0,1023,0,255);
  
// background(255, 255, 255);
//   fill(0, 0, 0);
//   textAlign(LEFT);
  text('received a '+ latestData, 10, 10); // print the data to the sketch

  // in this example, we are reciving a 0 and a 1
  // if the button is not pressed we get a 0
   if (latestData === 0) {
    fill(0)
    rectMode(CENTER);
    rect(width / 2, height / 2, 1000, 1000);
  } else { // if it is pressed, we get a 1
    fill(255)
    rectMode(CENTER);
    rect(width / 2, height / 2, 1000, 1000);
  }
}