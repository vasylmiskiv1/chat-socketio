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
  // console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data.roomId);
    socket.emit("joined_room", {
      roomId: data.roomId,
      userData: {
        userId: socket.id,
        userName: data.userName,
      }
    });
    // console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    console.log(data.roomId);
    socket.to(data.roomId).emit("receive_message", data.message);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
