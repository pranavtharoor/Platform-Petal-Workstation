
const config = require('./config/database');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const Profile = require('./models/profile');
const Project = require('./models/project');

module.exports = function (sio) {


  global.loggedinSockets = [];
  sio.on('connection', function(socket){

    socket.on('login', function(data){
      jwt.verify(data, config.secret, function(err, decoded){
        if (!err && decoded){
          global.loggedinSockets.push({username:decoded._doc.username, socketid: socket.id});
        }
      });
    });

    socket.on('logout', () => {
      var pos = global.loggedinSockets.findIndex((element) => {
         return element.socketid == socket.id;
        });
      if(pos > -1) {
        global.loggedinSockets.splice(pos, 1);
      }
    });

    var checkUserLoggedin = (username) => {
      var pos = global.loggedinSockets.findIndex((element) => {
         return element.username == username;
        });
      if(pos > -1) return true;
      else return false;
    };

    var getUsername = (socketid) => {
      var data = global.loggedinSockets.find((element) => {
         return element.socketid == socketid;
        });
      return data.username;
    };

    var getSocketId = (username) => {
      var data = global.loggedinSockets.find((element) => {
         return element.username == username;
        });
      return data.socketid;
    };

      socket.on('requestConnection', (receiver) => {
        if (checkUserLoggedin(receiver)) {
          sio.sockets.connected[getSocketId(receiver)].emit('connectionRequested', getUsername(socket.id));
        }
      });

      socket.on('acceptRequest', (sender) => {
        if (checkUserLoggedin(sender)) {
          sio.sockets.connected[getSocketId(sender)].emit('requestAccepted', getUsername(socket.id));
        }
      });

      socket.on('declineRequest', (sender) => {
        if (checkUserLoggedin(sender)) {
         sio.sockets.connected[getSocketId(sender)].emit('requestDeclined', getUsername(socket.id));
        }
      });

      socket.on('removeConnection', (connection) => {
        if (checkUserLoggedin(connection)) {
          sio.sockets.connected[getSocketId(connection)].emit('connectionRemoved', getUsername(socket.id));
        }
      });

    socket.on('disconnect', () => {
      var pos = global.loggedinSockets.findIndex((element) => {
         return element.socketid == socket.id;
        });
      if(pos > -1) {
        global.loggedinSockets.splice(pos, 1);
      }
    });
  });
}