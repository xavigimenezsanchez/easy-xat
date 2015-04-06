var app = require('express')();
var http = require("http").Server(app);  //necessitem http per treballar amb socket.io

app.use('/',require("./controllers/static"));

require("./controllers/xat")(http);


http.listen(process.env.PORT, process.env.IP,function() {
    console.log('listening on host '+process.env.IP+':'+process.env.PORT);
});
