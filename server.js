const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const morgan = require("morgan")

const port = process.env.PORT || 4001;
const app = express();

const server = http.createServer(app);
const io = socketIo(server); // < Interesting!

app.use(morgan('dev'));

let messages = []

io.on("connection", (socket) => {
    console.log("hello socket")
    socket.send("broad msg", messages);
    console.log(socket.id)
    socket.on("send msg", (messageObj) => {
        messages.push({msg: messageObj.msg, author: messageObj.author});
        io.sockets.emit("broad msg", messages);
    });
})

server.listen(port, () => console.log(`Listening on port ${port}`));
//
