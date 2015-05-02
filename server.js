var PORT = 33333;
var HOST = '127.0.0.1';

var dgram = require('dgram');
var server = dgram.createSocket('udp4');

server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function (message, remote) {
    console.log('Message from: ' + remote.address + ':' + remote.port);
    console.log('calculating...')

    message = message + '';

    var operand1 = message.split('&')[0];
    var operand2 = message.split('&')[1];
    var operator = message.split('&')[2];

    var result = operand1 + ' ' + operator + ' ' + operand2 + ' = ' ;

    switch (operator) {
      case '+':
        result += parseInt(operand1, 10) + (parseInt(operand2, 10));
        break;
      case '-':
        result += operand1 - operand2;
        break;
      case 'x':
        result += operand1 * operand2;
        break;
      case '/':
        result += operand1 / operand2;
        break;
      default :
        result = 'Error: Invalid operator given!'
    }

    console.log(result);

    var resultMessage = new Buffer(result);

    server.send(resultMessage, 0, resultMessage.length, remote.port, remote.address, function(err, bytes) {
      if (err) throw err;
      console.log('Result sent to ' + remote.address +':'+ remote.port);
    });
});

server.bind(PORT, HOST);