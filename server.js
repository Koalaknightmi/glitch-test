const FORCE_HTTPS = false; // Use this to control the force of HTTPS!
var express = require('express');
//var bodyParser = require('body-parser');
var app = express();
var Sequelize = require('sequelize');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ip = "";
var log = console.log;
var chat = [];
var onlinepls = {};
const sendmail = require('sendmail')({
  logger: {
    debug: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error
  },
  silent: false
  /*,                                  
    devHost: 'https://star-feels.glitch.me/', */ // Default: localhost
});

function checkHttps(req, res, next) {
  // protocol check, if http, redirect to https
  console.log(req);
  if(req.url.indexOf("https") != -1) {
    return next()
  } else {
    res.redirect('https://' + req.hostname + req.url);
  }
}/**/
var sequelize = new Sequelize('database', process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'sqlite',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  storage: '.data/database.sqlite'
});
var onlineplayers = {};
var Admins = [
  "koalastrikermi",
];
var chatrooms = {};
var User;

function Player(id, username, col, r) {
  this.user = username;
  this.id = id;
  this.pcol = col;
  this.prank = r;
  this.score = 0;
  this.x = 31;
  this.y = 15;
  this.z = 0;
  this.rx = 0;
  this.ry = 0;
  this.rz = 0;
  this.entity = null;
}
var gamerooms = {};
sequelize.authenticate()
  .then(function (err) {
    console.log('sql Connection has been established successfully.');
    // define a new table 'users'
    User = sequelize.define('users', {
      userName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: true,
          isEmail: true
        }
      },
      password: {
        type: Sequelize.STRING
      },
      lastLogin: {
        type: Sequelize.DATE
      },
      isAdmin: {
        type: Sequelize.BOOLEAN
      },
      visitNum: {
        type: Sequelize.INTEGER
      },
      nameCOl: {
        type: Sequelize.STRING
      },
      rankNum: {
        type: Sequelize.INTEGER
      },
      gamesPlayed: {
        type: Sequelize.INTEGER
      },
      online: {
        type: Sequelize.BOOLEAN
      },
      inventory: {
        type: Sequelize.JSON
      },
      friends: {
        type: Sequelize.JSON
      },
      monthScore: {
        type: Sequelize.INTEGER
      },
      allTimeScore: {
        type: Sequelize.INTEGER
      },
      profileIMG: {
        type: Sequelize.STRING
      },
      ipAD: {
        type: Sequelize.STRING
      },
      banned: {
        type: Sequelize.BOOLEAN
      }
    });
    setup()
  })
  .catch(function (err) {
    console.log('Unable to connect to the database: ', err);
  });

function setup() {
  User.sync({
    force:false
  }) // We use 'force: true' in this example to drop the table users if it already exists, and create a new one. You'll most likely want to remove this setting in your own apps
  User.findAll().then(users => {
    //console.log(users); 
  })
  /*sequelize.query("ALTER TABLE users ADD banned TINYINT(1)").spread((results, metadata) => {
})*/
}

if(FORCE_HTTPS) // This is what forces HTTPS! Cool right?
{
  app.all('*', checkHttps);
}/**/
app.use(express.static('public'));
app.get('/', function (request, response) {
  //response.sendFile(__dirname+'/public/index.html');
  console.log(Date.now() + " Ping Received");
  ip = request.headers['x-forwarded-for'].split(",")[0]
  //response.sendStatus(200);
});
app.set('port', (process.env.PORT || 5000));
http.listen(app.get('port'), function () {
  console.log('listening on port', app.get('port'));
});
/*io.origins((origin,callback) => {
console.log(origin);
})*/
var games = io
  .of('/games')
  .on('connection', function (socket) {
    var socketr = "";
    games.emit("playtime", gamerooms);
    //console.log(gamerooms);
    setInterval(() => {
      //console.log(gamerooms.koalastrikermi2.playerdata);
      socket.emit('playtime', gamerooms);
    }, 5000);
    setInterval(() =>{
    for(var i in gamerooms){
        socket.to(i).emit("message2",gamerooms[i].chat);
      }
    },1000);
    socket.on("new game", function (roomdata) {
      let id = socket.id;
      console.log("hi");
      User.findOne({
        where: {
          userName: roomdata.creator
        }
      }).then(user => {
        roomdata.avgrank = user.dataValues.rankNum;
        roomdata.creatorcol = user.dataValues.nameCOl;
        var newplayer = {
          id:id,user:roomdata.creator, pcol:user.dataValues.nameCOl, prank:user.dataValues.rankNum,score:0,x:31,y:15,z:0,rx:0,ry:0,rz:0,entity:null};
        roomdata.playerdata = {};
        roomdata.chat = [{
          col:"black",
          user: 'bot',
          message: roomdata.creator +' created the game',
          timesince: new Date().toISOString()
          }
        ];
        roomdata.playerdata[id] = newplayer;
        console.log(roomdata, "new game");
        let rc = roomdata.creator;
      roomdata.key = roomdata.creator;
      socket.join(rc, function () {
        let r = Object.keys(socket.rooms);
        console.log(r);
      });
        socket.emit("in game players",{
          id: id,
          onlineplayers: roomdata.playerdata,
          chat: roomdata.chat
        })
        //socket.emit("message",roomdata.chat);
      //games.emit("new player",newplayer);
     gamerooms[roomdata.creator] = roomdata;
      games.emit("playtime", gamerooms);
      });
     });
    socket.on("join game room", function (data) {
      let id = socket.id;
      console.log("joined");
      User.findOne({
        where: {
          userName: data.u
        }
      }).then(user => {
        var newplayer = {id:id, user:data.u, pcol:user.dataValues.nameCOl, prank:user.dataValues.rankNum,score:0,x:31,y:15,z:0,rx:0,ry:0,rz:0,entity:null};
        console.log(gamerooms[data.k].chat);
        gamerooms[data.k].playerdata[id] = newplayer;
        gamerooms[data.k].playernum += 1;
        /**/gamerooms[data.k].chat.unshift({
          col:"black",
          user: 'bot',
          message: data.u +' joined',
          timesince: new Date().toISOString()
        });
        socket.join(data.k, function () {
          let r = Object.keys(socket.rooms);
          console.log(r);
        });
        console.log(data.k);
        games.in(data.k).emit("in game players", {
            id: id,
            onlineplayers: gamerooms[data.k].playerdata,
            chat: gamerooms[data.k].chat
          });
        //socket.to(data.k).emit("message",gamerooms[data.k].chat);
        console.log(gamerooms[data.k], "player joined");
        games.emit("playtime", gamerooms);
      });
    });
    socket.on('message2', function (data,k) {
      console.log(data,k);
      console.log("hiiiii");
    if(!gamerooms[k]) return;
    User.findOne({
      where: {
        userName: data.user
      }
    }).then(user => {
      data.col = user.dataValues.nameCOl;
    });
    data.timesince = (new Date().toISOString())
    gamerooms[k].chat.unshift(data);
    console.log(gamerooms[k].chat);
      //console.log(data);
    socket.to(k).emit("message2",gamerooms[k].chat);
    });
    socket.on("player moved", function (data,k) {
     //console.log(k);
    //console.log(gamerooms);
    if(!gamerooms[k]) return;
      gamerooms[k].playerdata[socket.id].x = data.x;
      gamerooms[k].playerdata[socket.id].z = data.z;
      gamerooms[k].playerdata[socket.id].y = data.y;
      gamerooms[k].playerdata[socket.id].rx = data.rx;
      gamerooms[k].playerdata[socket.id].rz = data.rz;
      gamerooms[k].playerdata[socket.id].ry = data.ry;
      gamerooms[k].playerdata[socket.id].score = data.score;
      
      
      socketr = Object.keys(socket.rooms);
      
      socket.to(k).emit("ingame players moved", data,gamerooms,gamerooms[k].chat);
    });
    socket.on("disconnecting", function () {
      socketr = Object.keys(socket.rooms); /*console.log(socketr)*/ ;
      //socketr = [];
    });
    socket.on("disconnect", function () {
      socket.broadcast.emit('leave', socket.id);
      if(gamerooms[socketr] === undefined && socketr[1] === undefined || gamerooms === undefined || socketr === undefined) {
        //console.log(socketr[1], gamerooms[socketr], gamerooms[socketr[1]]);
        return; /**/
      } else if(socketr[1] !== undefined) {
        gamerooms[socketr[1]].chat.unshift({
          col:"black",
          user: 'bot',
          message: gamerooms[socketr[1]].playerdata[socket.id].user +' left',
          timesince: new Date().toISOString()
        });
        delete gamerooms[socketr[1]].playerdata[socket.id];
        gamerooms[socketr[1]].playernum -= 1;
        if(gamerooms[socketr[1]].playernum === 0) {
          delete gamerooms[socketr[1]];
        } else{
        socket.to(socketr[1]).emit("message2",gamerooms[socketr[1]].chat);
        }
        games.emit("playtime", gamerooms);
      } else {
        //console.log(gamerooms[socketr].playerdata);
        gamerooms[socketr].chat.unshift({
          col:"black",
          user: 'bot',
          message: gamerooms[socketr[1]].playerdata[socket.id].user +' left',
          timesince: new Date().toISOString()
        });
        socket.to(socketr).emit("message2",gamerooms[socketr].chat);
        delete gamerooms[socketr].playerdata[socket.id];
        gamerooms[socketr].playernum -= 1;
        if(gamerooms[socketr].playernum === 0) {
          delete gamerooms[socketr];
        }
        games.emit("playtime", gamerooms);
      }
    });
  });
io.sockets.on('connection', function (socket) {
  console.log('socket Connection has been established successfully.');
  /*User.findAll().then(users => {
  for(var i in users){
  console.log(users[i].dataValues.id,users[i].dataValues.userName);
  /*User.findAll().then(users => {
    for(var i in users){
    console.log(users[i].dataValues.id,users[i].dataValues.userName);
    
    }                                                      
       //console.log(users); 
    })
  }                                                      
     //console.log(users); 
  })*/
  socket.on('message', function (data) {
    User.findOne({
      where: {
        userName: data.user
      }
    }).then(user => {
      data.col = user.dataValues.nameCOl;
    });
    data.timesince = (new Date().toISOString())
    chat.unshift(data);
    console.log(chat);
    io.emit("message",chat);
  });
  socket.on("register", function (data) {
    User.findOne({
      where: {
        userName: data.name
      }
    }).then(user => {
      if(user === null) {
        if(Admins.indexOf(data.name) > -1) {
          User.create({
            userName: data.name,
            email: data.email,
            password: data.pass,
            lastLogin: new Date(),
            isAdmin: true,
            visitNum: 1,
            nameCOl: "blue",
            rankNum: 0,
            gamesPlayed: 0,
            online: true,
            inventory: "",
            money: 100,
            friends: "",
            monthScore: 0,
            allTimeScore: 0,
            profileIMG: "https://cdn.glitch.com/20e968ff-97d4-4430-83ad-42189e4f368d%2Favatar_generic.png?1545099848845",
            ipAD: ip,
            banned: false
          });
          console.log('user ' + data.name + ' registered');
          socket.emit('registered', data.name);
          var id = socket.id;
          sendmail({
            from: 'noreplycaedeshostis@glitch.com',
            to: data.email,
            subject: 'caedes hostis',
            html: 'welcome to caedes hostis one of the best and fastes fps multiplayer games on earth we hope you enjoy playing if u did not regester with this email plz report to <a href = "https://playcanvas.com/koalastrikermi">koalastrikermi<a> if u have playcanvas<br>or if u dont have playcanvas file a complaint here<br><iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfeSaOl-AXx5KaNQs-8Q-wP0vBOX4pBeukFIOzTAxw5erWOgQ/viewform?embedded=true" width="640" height="672" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe><br><br> (I will add other report options later) <br><br>signed,<br>the GeekyKoala <br>studios sorry for any inconvenience we may have caused you<br><br>Hope you enjoy',
          }, function (err, reply) {
            console.log(err && err.stack);
            console.dir(reply);
          });
          User.findAll().then(users => {
            io.emit("leaderboard", users);
            //console.log(users);
          })
        } else {
          User.create({
            userName: data.name,
            email: data.email,
            password: data.pass,
            lastLogin: new Date(),
            isAdmin: false,
            visitNum: 1,
            nameCOl: "blue",
            rankNum: 0,
            gamesPlayed: 0,
            online: true,
            inventory: "",
            money: 100,
            friends: "",
            monthScore: 0,
            allTimeScore: 0,
            profileIMG: "https://cdn.glitch.com/20e968ff-97d4-4430-83ad-42189e4f368d%2Favatar_generic.png?1545099848845",
            ipAD: ip,
            banned: false
          });
          console.log('user ' + data.name + ' registered');
          socket.emit('registered', data.name);
          var id = socket.id;
          sendmail({
            from: 'noreplycaedeshostis@glitch.com',
            to: data.email,
            subject: 'caedes hostis',
            html: 'welcome to caedes hostis one of the best and fastes fps multiplayer games on earth we hope you enjoy playing if u did not regester with this email plz report to <a href = "https://playcanvas.com/koalastrikermi">koalastrikermi<a> if u have playcanvas<br>or if u dont have playcanvas file a complaint here<br><iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfeSaOl-AXx5KaNQs-8Q-wP0vBOX4pBeukFIOzTAxw5erWOgQ/viewform?embedded=true" width="640" height="672" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe><br><br> (I will add other report options later) <br><br>signed,<br>the GeekyKoala studios sorry for any inconvenience',
          }, function (err, reply) {
            console.log(err && err.stack);
            console.dir(reply);
          });
      var id = socket.id;
      var newplayer = {id:id, user:data.user};
      onlineplayers[id] = newplayer;
    onlinepls[socket.id] = { user:data.user};
    chat.unshift({
        col:"black",
        user: 'bot',
        message: data.user +' is online now',
        timesince: new Date().toISOString()
      });
    io.emit("message",chat);
          User.findAll().then(users => {
            io.emit("leaderboard", users);
            //console.log(users);
          })
        }
        /*User.findAll().then(users => {
            console.log(users);
        })*/
      } else {
        socket.emit('already used', data.name);
        console.log(data.name + " username already used");
      }
    });
  });
  socket.on("login attempt", function (data) {
    console.log("login attempt" + JSON.stringify(data));
    User.findOne({
      where: {
        userName: data.user
      }
    }).then(users => {
      if(users === null) {
        socket.emit("login failed");
        console.log("login failed " + data.user + " is not regestered");
      } else if(users.dataValues.password === data.pass) {
        //console.log(users);
        //console.log(users.dataValues.password);
        User.update({
          lastLogin: new Date(),
          visitNum: users.visitNum + 1,
          online: true
        }, {
          where: {
            userName: data.user
          }
        });
        //console.log("logged in:"+users.password+" = "+data.pass);
        var id = socket.id;
        var newplayer = {id:id, user:data.user};
        onlineplayers[id] = newplayer;
        /*console.log("player initalized " + data.user);
        io.emit("in game players", {
          id: id,
          onlineplayers: onlineplayers
        });*/
        //console.log(onlineplayers);
        
        User.findAll().then(users => {
          for(var i in users) {
            console.log(users[i].dataValues.id, users[i].dataValues.userName);
          }
          socket.emit("leaderboard", users);
          socket.emit("logged in", data.user);
          onlinepls[socket.id] = { user:data.user};
    chat.unshift({
      col:"black",
      user: 'bot',
      message: data.user +' is online now',
      timesince: new Date().toISOString()
    });
    io.emit("message",chat);
        })
      } else {
        socket.emit("login failed");
        console.log("login failed " + users.password + "!==" + data.pass);
      }
    })
   
  /*socket.on("player moved", function (data) {
    if(!onlineplayers[data.id]) return;
    onlineplayers[data.id].x = data.x;
    onlineplayers[data.id].z = data.z;
    onlineplayers[data.id].y = data.y;
    //console.log(onlineplayers);
    socket.broadcast.emit("ingame players moved", data);
  });*/
  socket.on("disconnect", function () {
    if(!onlineplayers[socket.id]) return;
    User.update({
      online: false
    }, {
      where: {
        userName: onlineplayers[socket.id].user
      }
    });
    delete onlineplayers[socket.id];
    // Update clients with the new player killed 
    socket.broadcast.emit('leave', socket.id);
    if(!onlinepls) return;
    if(onlinepls[socket.id]!==undefined){
    var l = onlinepls[socket.id].user;
    chat.unshift({
      col:"black",
      user: 'bot',
      message: l +' is offline now',
      timesince: new Date().toISOString()
    });
    }
    delete onlinepls[socket.id];
   
   io.emit("message",chat); 
  });
  });
});
console.log('Server started.');
setInterval(() => {
  //tp.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
setInterval(function(){
io.emit("message",chat);
}, process.env.LOADTIME); 
/*
  socket.join('some room');
  // sending to the client
  socket.emit('hello', 'can you hear me?', 1, 2, 'abc');

  // sending to all clients except sender
  socket.broadcast.emit('broadcast', 'hello friends!');

  // sending to all clients in 'game' room except sender
  socket.to('game').emit('nice game', "let's play a game");

  // sending to all clients in 'game1' and/or in 'game2' room, except sender
  socket.to('game1').to('game2').emit('nice game', "let's play a game (too)");

  // sending to all clients in 'game' room, including sender
  io.in('game').emit('big-announcement', 'the game will start soon');

  // sending to all clients in namespace 'myNamespace', including sender
  io.of('myNamespace').emit('bigger-announcement', 'the tournament will start soon');

  // sending to a specific room in a specific namespace, including sender
  io.of('myNamespace').to('room').emit('event', 'message');

  // sending to individual socketid (private message)
  io.to(`${socketId}`).emit('hey', 'I just met you');

  // WARNING: `socket.to(socket.id).emit()` will NOT work, as it will send to everyone in the room
  // named `socket.id` but the sender. Please use the classic `socket.emit()` instead.

  // sending with acknowledgement
  socket.emit('question', 'do you think so?', function (answer) {});

  // sending without compression
  socket.compress(false).emit('uncompressed', "that's rough");

  // sending a message that might be dropped if the client is not ready to receive messages
  socket.volatile.emit('maybe', 'do you really need it?');

  // specifying whether the data to send has binary data
  socket.binary(false).emit('what', 'I have no binaries!');

  // sending to all clients on this node (when using multiple nodes)
  io.local.emit('hi', 'my lovely babies');

  // sending to all connected clients
  io.emit('an event sent to all connected clients');

*/