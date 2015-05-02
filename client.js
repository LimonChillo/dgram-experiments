var PORT = 33333;
//var SERVERHOST = '0.0.0.0';
var HOST = '127.0.0.1';

var dgram = require('dgram');
var operand1, operand2, operator, message;
var str = ""

process.argv.forEach(function (val, index, array) {
  operand1 = array[2];
  operand2 = array[4];
  operator = array[3];
});

str += operand1 + '&' + operand2 + '&' + operator;
message = new Buffer(str);

var client = dgram.createSocket('udp4');
client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
  if (err) throw err;
  console.log('Please ' + HOST +':'+ PORT + ' calculate ' + operand1 + ' ' + operator + ' ' + operand2);
  // client.close();

});

client.on('message', function (message, remote) {
  console.log('Received Result for ' + message);
  client.close();
});

// client.bind(PORT, HOST);