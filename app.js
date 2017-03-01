const http = require('http');
const fs = require('fs');
const socketio = require('socket.io');
const port = 3000;

const server = http.createServer();

server.on('request',function(req, res){
  fs.readFile('./client/index.html', 'utf8', function(err, data){
    if(err){
      res.writeHead(404,{'Content-Type': 'text/plain'});
      res.write('404 page not found.');
      return res.end();
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
});

server.listen(port, function(){});

const io = socketio.listen(server);
io.sockets.on('connection', function(socket){ //通信に対してのイベント
  socket.on('message', function(data){　//messageが飛んできたときの処理。
//    console.log(data.value);
    io.sockets.emit('from_server', {value: data.value});　//サーバーに繋げている人にメッセージを送る
  });
});
