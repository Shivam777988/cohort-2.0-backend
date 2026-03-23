import app from "./src/app.js";
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
  // ...lo
  console.log('new connection created');
  socket.on("message", (msg) => {
  console.log("user fired message event");
  console.log("Received message:", msg);
  io.emit("abc")
  });
});

httpServer.listen(3000,() => {
  console.log("Server is running on port 3000");
});