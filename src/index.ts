const connect = require("./vendor/pull-ws");

const WS_URL = "ws://localhost:1103";

connect(WS_URL, function (err, stream) {
  if(err) throw err //handle err
  pull(source, stream, sink)
})