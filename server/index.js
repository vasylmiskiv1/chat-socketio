const express = require("express");

const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User has successfully connected ${socket.id}`);

  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`User with ID: ${socket.id} has joined room ${room}`);
  })

  socket.on("chat_message", (message) => {
    console.log(message);
  })

  socket.on("disconnect", () => {
    console.log("User disconnected");
  })
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
