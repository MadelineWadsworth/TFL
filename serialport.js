// var sp = require('serialport')
//
// sp.SerialPort.list()
// .then((data) => console.log(data))
// .catch(err => console.log(err));

const sp = require('serialport');

sp.list()
  .then((ports) => {
    console.log('Available serial ports:');
    ports.forEach((port) => {
      console.log(port.path);
    });
  })
  .catch((err) => {
    console.error('Error listing serial ports:', err);
  });
