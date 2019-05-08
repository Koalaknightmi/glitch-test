{
var socket = window.io.connect( /*'https://server-for-my-tests.glitch.me'*/ ); // Glitch hosted server
var sg = window.io.connect(/*'https://multiplayer-test2.glitch.me/games'+ */ '/games'); // the games conection
/*LoginRegister.socket = socket;
console.log(socket, "background:blue");
var div = document.createElement("div");
var style = document.createElement("style");
div.id = "html";
div.innerHTML = this.loginregisterhtml.resource;
style.innerHTML = this.loginregistercss.resource;
document.body.appendChild(div);
document.head.appendChild(style); */
var scene = "games-main";    
var pages = document.querySelectorAll(".page");
var sideb = document.querySelectorAll(".btn-nav");
/*            Notification.requestPermission().then(function() {
new Notification('thank you', {body: 'thank u for letting me use the notifications of ur computeru will need these as u play', icon:'https://cdn.kastatic.org/images/avatars/svg/aqualine-ultimate.svg'});
});*/    
var notifimg = "https://cdn.glitch.com/20e968ff-97d4-4430-83ad-42189e4f368d%2Fcaedes%20hostis.png?1546473346888";
var player = this.player;
var cam1 = this.cam1;
var cam2 = this.cam2;
var app = this.app;
var lform = document.getElementById("logform");
var rbtn = document.getElementById("register-btn");
var rform = document.getElementById("regform");
var bbtn = document.getElementById("backbtn");
var pg1 = document.getElementById("login");
var pg2 = document.getElementById("regpage");
var login = document.getElementById("login-wrapper");
var save = document.getElementById("check");
var save2 = document.getElementById("check2");
var warn = document.getElementById("warn");
var warn2 = document.getElementById("warn2");
var warn3 = document.getElementById("warn3");
var bar = document.getElementById("button-loading-bar");
var barin = document.getElementById("button-loading-bar-inner");
var enter = new Audio('https://www.Khanacademy.org/sounds/question-correct.mp3');
var username = "";
var chatwrapper = document.getElementById("chat-wrapper");
var cmg = document.getElementById("chat-message");
var chatform = document.getElementById("chat-form");
var msgs = document.getElementById("messages");
var mainpg = document.getElementById("main-page");
var lboards = document.getElementById("l-table-b");
var g_list = document.getElementById("g-table-b");
var game_create_btn = document.getElementById("create-game-btn");
var game_join_btn = document.getElementById("join-game-btn");
var frame = 0;
var frame2 = 1;
var game_room_key = "";
var g_i_s = {
  i:document.getElementById("g-i-img"),
  t:document.getElementById("g-i-type"),
  u:document.getElementById("g-i-username"),
  m:document.getElementById("g-i-map"),
  a:document.getElementById("g-i-ar"),
  p:document.getElementById("g-i-pnum"),
  pt:document.getElementById("g-i-table-b")
};
var maps_imgs = {
courtyard:"https://cdn.glitch.com/20e968ff-97d4-4430-83ad-42189e4f368d%2Fcaedes%20hostis.png?1546473346888",
};
var chat = [
  {
  user: "koala",
  message: "hi :D",
  timesince: null
}, 
  {
  user: "koala",
  message: "?c=red hi there?=?",
  timesince: "2018-12-02T20:25:33.535Z"
}, 
  {
  user: "koala",
  message: "hi",
  timesince: "Thu Mar 1 2018 20:00:00 GMT-0400 (Eastern Daylight Time)"
}];
var mylocalkey = "koalastrikermi-caedeshostis-";
var loggedin = false;
}// variables
{
var log = function(t, deco, type) {
  if (type === "normal" || type === undefined) {
    if (deco === "") {
      console.log(t);
    } else {
      console.log("%c" + t, deco);
    }
  } else if (type === "clear") {
    console.clear();
    if (deco === "") {
      console.log("log cleared");
    } else {
      console.log("%c log cleared", deco);
    }
  } else if (type === "groupbegin") {
    if (deco === "") {
      console.group(t);
    } else {
      console.group("%c" + t, deco);
    }
  } else if (type === "groupend") {
    if (deco === "") {
      console.log(t);
      console.groupEnd();
    } else {
      console.log("%c" + t, deco);
      console.groupEnd();
    }
  } else if (type === "warn") {
    if (deco === "") {
      console.warn(t);
    } else {
      console.warn("%c" + t, deco);
    }
  } else if (type === "error") {
    if (deco === "") {
      console.error(t);
    } else {
      console.error("%c" + t, deco);
    }
  }
};
var localsave = function(vare, gs, t) {
  if (gs === "set") {
    localStorage.setItem(mylocalkey + vare, t);
    log("localstorage item " + mylocalkey + vare + " is now set to: " + localStorage.getItem(mylocalkey + vare));
  } else if (gs === "get") {
    log("localstorage item " + mylocalkey + vare + " was returned as: " + localStorage.getItem(mylocalkey + vare));
    return localStorage.getItem(mylocalkey + vare);
  } else if (gs === "devare") {
    log(mylocalkey + vare + "  was devared");
    localStorage.removeItem(mylocalkey + vare);
  }
};
var hash = function(st) {
  var base64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var bin = [];
  for (var i = 0; i < st.length; i++) {
    bin += st.charCodeAt(i) * 1;
  }
  // useful for instability
  var sum = 0;
  for (i = 0; i < bin.length; i++) {
    sum += bin[i] * 1;
  }
  var res = [];
  // mess it up a bunch
  for (var j = 0; j < (325 + sum % 28); j++) {
    for (i = 0; i < bin.length; i++) {
      // mess up the value
      var indx = (i * i + 17 * i + 127) % 64;
      indx *= (indx + 8324) * 506 + bin[i];
      indx %= 3209;
      indx = Math.floor(indx / (4 + bin[i] / 23)) + 18273;
      indx ^= 19915 + 53 * j + 12 * j * j;
      indx = indx & ((1 << 10) - 1);
      indx += 88483 + 1279 * j + 398 * sum;
      indx *= 1.3;
      indx = Math.floor(Math.sqrt(indx));
      indx += st.charCodeAt(i);
      indx += (i * i * i) % (16 + (j % 37));
      indx += i;
      indx = Math.floor(indx);
      indx %= 16;
      // now update the actual string
      if (res[indx] === undefined) {
        res[indx] = 0;
      }
      res[indx] += bin[i];
      res[indx] *= 14.1729;
      res[indx] += Math.floor(j * j * j * bin[i] / 23);
      res[indx] = Math.floor(res[indx]);
      res[indx] &= 63;
    }
  }
  var end = "";
  for (i = 0; i < res.length; i++) {
    end += base64[res[i] || 0];
  }
  return end;
}; /*hash made by jason hutcheson here https://www.Khanacademy.org/computer-programming/simple-login-example/6518972362981376*/
function searchtable(i, u, s) {
  var input, ul, filter, li, a, i;
  input = document.getElementById(i);
  filter = input.value.toUpperCase();
  ul = document.getElementById(u);
  li = ul.getElementsByTagName('tr');
  input.style.background = "";
  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("td")[(s - 1)];
    if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
};
var draw = function() {
  bar.style.display = "block";
  barin.style.width = frame + "%";
  if (frame <= 100) {
    frame++;
  }
  setTimeout(draw, 10);
  if (frame >= 100) {
    login.style.display = "none";
    //div.style.display = "none";
    chatwrapper.style.display = "inline-block";
    //div.style.display = "none";
    //chatwrapper.style.display = "inline-block";
    //loggedin = true;
    //console.log(loggedin);
    //app.fire("loggedin");
    //console.log("camchange");
    //cam1.enabled = false;
    //cam2.enabled = true;
    //player.enabled = true;
    //socket.emit ('initialize',user);
    mainpg.style.display = "block";
    showPage(scene);
  }
};
var fade = function() {
  login.style.opacity = frame2;
  if (frame2 >= 0) {
    frame2 -= 0.01;
  }
  setTimeout(fade, 10);
  if (frame2 <= 0) {
    login.style.display = "none";
    chatwrapper.style.display = "inline-block";
    mainpg.style.display = "block";
    showPage(scene);
    //div.style.display = "none";
  }
};
var page2 = function() {
  pg1.style.display = "none";
  pg2.style.display = "block";
};
var page1 = function() {
  pg2.style.display = "none";
  pg1.style.display = "block";
};
var prettify = function(msg) {
  msg = String(msg).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  // === Regular Expressions ==========================
  var boldCheck = /\*([\S\ ]+)\*/gi;
  var italicCheck = /\_([\S\ ]+)\_/gi;
  var inlineCodeCheck = /`([\S\ ]+)`/gi;
  var blockCodeCheck = /```([\S\ \n ]+)```/gi;
  var urlCheck = /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]+)\/?/gi;
  var imageCheck = /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]+)(.png|.jpg|.gif|.tif|.svg)$/gi;
  var newlineCheck = /[\r\n|\n]+/g;
  var emojiCheck = {
    smiley: /[^~][:=]\)/g,
    wink: /[^~];\)/g,
    tongue: /[^~]:[pP]/g,
    laugh: /[^~][xX]D/g,
    grin: /[^~]:[dD]/g,
  };
  var replacements = {
    ":D": "5677525051932672",
    ":O": "5101486655438848",
    "O:": "5101486655438848",
    "D:": "6622801317101568",
    ";D": "5838107906441216",
    "xD": "5939687442907136",
    "XD": "5939687442907136",
    ":\\)": "6242984943976448",
    ":\\(": "6400123167604736",
    ":'\\(": "4680201433546752",
    "\\)':": "4680201433546752",
    "\\)`:": "4680201433546752",
    ":`\\(": "4680201433546752",
    "D':": "4562424840355840",
    "D`:": "4562424840355840",
    ":P": "5804358220021760",
    ":p": "5804358220021760"
  }; //https://www.khanacademy.org/computer-programming/emoticon-to-emoji-image-thingy/5050033416994816
  var colorCheck = /\?c=(\w+)\s(.+?)=\?/g;
  var backCheck = /\?\{background=(\w+)\s(.+?)\?=\]\?/g;
  var styleCheck = /\?\{style=(.+?)\?\?(.+?)\?=\}\?/g;
  var glowCheck = /\?\{glow=(\w+)\s(.+?)\?=\}\?/g;
  // ==================================================
  // === String Replace Stuff =========================
  //msg = msg.replace(/\<[\S\s]+\>/g, "");
  //msg = msg.replace(/\<\/[\S\s]+\>/g, "");
  msg = msg.replace(boldCheck,
    "<span style=\"font-weight:bold;\">$1</span>");
  msg = msg.replace(italicCheck,
    "<span style=\"font-style: italic;\">$1</span>");
  msg = msg.replace(inlineCodeCheck,
    "<div style=\"padding: 2px;font-family: monospace;background-color: rgb(230, 230, 230);\">$1</div>");
  msg = msg.replace(blockCodeCheck, "<span style=\"margin: 10px;padding: 15px;font-family: monospace;background-color: rgb(240, 240, 240);\">$1</span>");
  msg = msg.replace(urlCheck, "<a href=\"$2.$3\">$2.$3$4</a>");
  msg = msg.replace(newlineCheck, "<br>");
  if (imageCheck.test(msg)) {
    msg = msg.replace(imageCheck,
      " <a href=\"//$2.$3$4$5\" target=\"_blank\"><img src=\"//$2.$3$4$5\" style=\"max-width: 400px; max-height: 400px; margin: 0.5%; border: 1px solid #ddd;\"></a>"
    );
  } else {
    msg = msg.replace(urlCheck, "<br><a href=\"//$2.$3$4\" target=\"_blank\"><img src='\"//$2.$3$4\/latest.png' width='120'><br>$2.$3$4</a>");
  }
  //msg = msg.replace(emojiCheck.smiley, " <span class=\"emoji\">😊</span>").replace(emojiCheck.wink, " <span class=\"emoji\">😉</span>").replace(emojiCheck.tongue, " <span class=\"emoji\">😛</span>").replace(emojiCheck.laugh, " span class=\"emoji\">😆</span>").replace(emojiCheck.grin, " <span class=\"emoji\">😃</span>");
  msg = msg.replace(colorCheck, "<span style='color:$1'>$2</span>");
  msg = msg.replace(backCheck, "<span style='background:$1'>$2</span>");
  if (msg.indexOf("position") === -1) {
    msg = msg.replace(styleCheck, "<span style='$1'>$2</span>");
  }
  msg = msg.replace(glowCheck,
    "<span style='text-shadow:0px 0px 15px $1, 0px 0px 15px $1, 0px 0px 15px $1, 0px 0px 15px $1, 0px 0px 15px $1, 0px 0px 15px $1, 0px 0px 15px $1'>$2</span>"
  );
  for (var i in replacements) {
    var r = new RegExp(i, "g");
    msg = msg.replace(r, "<img style = 'height: 1em; width: auto;' alt ='https://www.khanacademy.org/computer-programming/smile/" + replacements[i] +
      "'src = 'https://www.khanacademy.org/computer-programming/smile/" + replacements[i] + "/latest.png'</img>");
  }
  // ==================================================
  msg = msg.replace(/~/gi, "");
  return msg;
}; //credit to brandon gigabyte giant https://www.Khanacademy.org/profile/GigabyteGiant/ kungur papa https://www.Khanacademy.org/profile/KonurPapa/ and jett https://www.Khanacademy.org/profile/JettBurns14/ and koalastrikermi https://www.Khanacademy.org/profile/KoalaStrikerMI/
var timeSince = function(date) {
  if (typeof date !== 'object') {
    date = new Date(date);
  }
  var seconds = Math.floor((new Date() - date) / 1000);
  var intervalType;
  var interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    intervalType = 'year';
  } else {
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      intervalType = 'month';
    } else {
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        intervalType = 'day';
      } else {
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
          intervalType = "hour";
        } else {
          interval = Math.floor(seconds / 60);
          if (interval >= 1) {
            intervalType = "minute";
          } else {
            interval = seconds;
            intervalType = "second";
          }
        }
      }
    }
  }
  if (interval > 1 || interval === 0) {
    intervalType += 's';
  }
  return interval + ' ' + intervalType;
}; //made by porter on khan academy https://www.Khanacademy.org/profile/battleboy21
var chatfunc = function() {
  msgs.innerHTML = "";
  if (chat.length > 30) {
    chat.pop(); //keeps the chat length to 30
  }
  chat.sort(function(a, b) {
    return new Date(a.timesince) - new Date(b.timesince);
  });
  for (var chati = 0; chati < chat.length; chati++) {
    var msge = document.createElement("div");
    msge.className = "message";
    msge.innerHTML = "<span class = 'timesince'>" + timeSince(chat[chati].timesince) + " ago </span><span class = \"message-user\"><strong>" + chat[chati].user +
      "</strong> said: </span><span class = \"message-text emoji\">" + prettify(chat[chati].message) + "</span>";
    msgs.appendChild(msge);
  }
};
var showPage = function(index){
    for(var i = 0; i < pages.length; i ++){
        pages[i].style.display = "none";
    }
    document.getElementById(index).style.display = "block";
}
}//functions
{
for(var i = 0; i < sideb.length; i ++){
  var sb = sideb[i];
  sb.addEventListener("click",function(e){
    e.preventDefault();
    scene = this.href.toLowerCase().split("#")[1];
    showPage(scene);
  })
}
rbtn.addEventListener("click", function(e) {
  e.preventDefault();
  page2();
});
lform.addEventListener("submit", function(e) {
  e.preventDefault();
  var password = document.getElementById("password");
  var fusername = document.getElementById("username").value;
  var save = document.getElementById("check");
  socket.emit("login attempt", {
    user: fusername,
    pass: window.btoa(hash(password.value))
  });
  socket.on('logged in', function(user) {
    /**/Notification.requestPermission()
      .then(function() {
new Notification('thank you', 
                 {body: 'thank u for letting me use the notifications these will help u as u play',
                  icon:notifimg
                 });
});
    username = user;
    localsave("save-checked", "set", JSON.stringify(save.checked));
    if (save.checked) {
      localsave("userdata", "set", JSON.stringify({
        name: fusername,
        pass: window.btoa(hash(password.value))
      }));
    }
    draw();
    enter.play();
    //div.style.display = "none";
    //socket.emit ('player joined',user);
    /*cam1.enabled = false;
    cam2.enabled = true;
    player.enabled= true;
    socket.emit ('initialize',user);*/
  });
  socket.on('login failed', function(user) {
    password.style.background = "#E57373";
    warn.innerHTML = "login failed";
    warn.style.display = "inline-block";
    console.log(warn);
  });
});
game_join_btn.addEventListener("click", function(e){
  e.preventDefault();
  sg.emit("join game room",{u:username,k:game_room_key});
});
bbtn.addEventListener("click", function(e) {
  e.preventDefault();
  page1();
});
rform.addEventListener("submit", function(e) {
  e.preventDefault();
  var password = document.getElementById("password-r");
  var email = document.getElementById("email-r");
  var fusername = document.getElementById("username-r");
  if (password.value.length < 6) {
    password.style.background = "#E57373";
    warn2.innerHTML = "to short";
    warn2.style.display = "inline-block";
    console.log(warn2);
  } else {
    socket.emit('register', {
      name: fusername.value,
      email: email.value,
      pass: window.btoa(hash(password.value))
    });
    socket.on('registered', function(user) {
          Notification.requestPermission()
      .then(function() {
new Notification('thank you', 
                 {body: 'thank u for letting me use the notifications these will help u as u play',
                  icon:notifimg
                 });
});
      username = user;
      fade();
      localsave("save-checked", "set", JSON.stringify(save.checked));
      if (save.checked) {
        localsave("userdata", "set", JSON.stringify({
          name: fusername.value,
          pass: window.btoa(hash(password.value))
        }));
      }
      //div.style.display = "none";
      /*loggedin = true;
      console.log(loggedin);
      console.log("camchange");
      cam1.enabled = false;
      cam2.enabled = true; 
      player.enabled = true;
      socket.emit ('initialize',user);*/
    });
    socket.on('already used', function(user) {
      fusername.style.background = "#E57373";
      warn2.innerHTML = "the username " + fusername.value + " has already been taken";
      warn2.style.display = "inline-block";
      console.log(warn2);
    });
  }
});
chatform.addEventListener("submit", function(e) {
  e.preventDefault();
  if (cmg.value.length > 3) {
    chat.unshift({
      user: username,
      message: cmg.value,
      timesince: new Date().toISOString()
    });
    cmg.value = "";
  }
  console.log("new message " + JSON.stringify(chat) + " " + chat.length);
});
game_create_btn.addEventListener("click", function(e){
  e.preventDefault();
  sg.emit("new game",{type:"free for all",creator:username,map:"courtyard",playernum:1});
});
}//event listeners
{
socket.on("leaderboard", function(data) {
  lboards.innerHTML = "";
  console.log("leaderboard data: ", data);
  data.sort(function(a, b) {
    return a.monthScore - b.monthScore;
  });
  if (data.length < 25) {
    for (var id = 0; id < 25; id++) {
      var lplace = document.createElement("tr");
      lplace.id = "place";
      lplace.className = "l-tr";
      if (id < data.length) {
        lplace.innerHTML = "<td>" + (id + 1) + "</td><td><img width = '25' height = '25' src = '" + data[id].profileIMG + "' alt = '" + data[id].userName +
          "'s' profile image'/></td><td><a class = 'profilelink' style = 'color:" + data[id].nameCOL + "' href = '#"+data[id].userName+"'>" + data[id].userName + "</a></td><td>" + data[id].monthScore +
          "</td>";
      } else {
        lplace.innerHTML = "<td>" + (id + 1) +
          "</td><td><img width = '25' height = '25' src = 'https://cdn.glitch.com/20e968ff-97d4-4430-83ad-42189e4f368d%2Favatar_generic.png?1545099848845' alt = 'no one's' profile image'/></td><td><a style = 'color:white' href = '#'>no one"+(id+1 - data.length)+"</a></td><td>null</td>";
      }
      lboards.appendChild(lplace);
    }
  } else {
    for (var id = 0; id < data.length; id++) {
      var lplace = document.createElement("tr");
      lplace.id = "place";
      lplace.className = "l-tr";
      lplace.innerHTML = "<td>" + (id + 1) + "</td><td><img width = '25' height = '25' src = '" + data[id].profileIMG + "' alt = '" + data[id].userName +
        "'s' profile image'/></td><td><a class = 'profilelink' style = 'color:" + data[id].nameCOL + "' href = '#"+data[id].userName+"'>" + data[id].userName + "</a></td><td>" + data[id].monthScore +
        "</td>";
      lboards.appendChild(lplace);
    }
  }
});
sg.on("playtime",function(data){
  console.dir(data);
  g_list.innerHTML = "";
  for(var id in data){
  var gplace = document.createElement("tr");
  gplace.id = data[id].rcreator;
  gplace.addEventListener("click",function(e){
    g_i_s.pt.innerHTML = "";
    console.dir(data[id]);
    game_room_key = data[id].key
    g_i_s.i.src = maps_imgs[data[id].map];
    g_i_s.t.textContent = data[id].type;
    g_i_s.u.innerHTML = "<a class = 'profilelink' style = 'color:" + data[id].creatorcol + "' href = '#"+ data[id].creator +"'>" + data[id].creator + "</a>"
    g_i_s.m.textContent = data[id].map;
    g_i_s.a.textContent = data[id].avgrank;
    g_i_s.p.textContent = data[id].playernum;
    for(var i in data[id].playerdata){
      var p = data[id].playerdata[i];
      var gplayrst = document.createElement("tr");
      gplayrst.innerHTML = "<td><a class = 'profilelink' style = 'color:" + p.pcol + "' href = '#"+ p.pname +"'>" + p.pname + "</a></td><td>" + p.prank +"</td><td>"+p.pscore+"</td>";
      g_i_s.pt.appendChild(gplayrst);
    }
  });/**/
  gplace.innerHTML = "<td>" + data[id].type+ "</td><td><a class = 'profilelink' style = 'color:" + data[id].rcreatorcol + "' href = '#"+ data[id].creator +"'>" + data[id].creator + "</a></td><td>"+data[id].map+"</td><td>" + data[id].avgrank +"</td><td>"+data[id].playernum+"</td>";
  
  g_list.appendChild(gplace);
  }
});
}//socket events
{
window.setInterval(chatfunc, 1000); /**/
}//set intervals
log(localsave("save-checked", "get"));
{
if (JSON.parse(localsave("save-checked", "get")) === true) {
  log("using saved data", "background:green;");
  log(JSON.parse(localsave("userdata", "get")));
  socket.emit("login attempt", {
    user: JSON.parse(localsave("userdata", "get")).name,
    pass: JSON.parse(localsave("userdata", "get")).pass
  });
  socket.on('logged in', function(user) {
    username = user;
 login.style.display = "none";
    //div.style.display = "none";
   chatwrapper.style.display = "inline-block";
    //loggedin = true;
    //console.log(loggedin);
    //app.fire("loggedin");
    //console.log("camchange");
    //cam1.enabled = false;
    //cam2.enabled = true;
    //player.enabled = true;
    //socket.emit ('initialize',user);
    mainpg.style.display = "block";
  });
} 

}//stray if statements