function WSServer(server){
  this._init(server);
}

WSServer.prototype._init = function(server){
  var io = require("socket.io").listen(server);

  io.on("connection", function(socket){
    // io.set("transports", ["xhr-polling"]);
    // io.set("polling duration", 10);
    socket.on('client/join', function(name){
      console.log("join from: ", name);
      socket.join(name);
    });
    socket.on('smarthome/remote', function(params){
      console.log(params);
      var room = params.name;
      io.to(room).emit("command/remote", JSON.stringify(params));
    })
  });
}

module.exports = WSServer;
