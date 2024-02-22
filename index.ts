import http from "http";
import { TubeChat } from "tubechat";
import { Server as SocketServer } from "socket.io";

const server = http.createServer();
const io = new SocketServer(server, { cors: { origin: "*" } });

const tubeChat = new TubeChat();
tubeChat.connect("maykbrito");

tubeChat.on("message", (message) => {
  io.emit("message", message);
});

io.on("connection", (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Cliente desconectado: ${socket.id}`);
  });
});

server.listen(3000);
