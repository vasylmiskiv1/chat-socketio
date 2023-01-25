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

let rooms = [];

io.on("connection", (socket) => {
  console.log(`User has successfully connected ${socket.id}`);

  socket.on("create_room", (roomData) => {
    socket.join(roomData.roomId);

    if (!rooms.includes(roomData.roomId)) {
      rooms.push(roomData.roomId);

      socket.emit("create_room", {
        status: "201",
        roomData: {
          roomId: roomData.roomId,
          username: roomData.username,
        },
      });
    } else {
      socket.emit("create_room", {
        status: "409",
        message: `Room ${roomData.roomId} already exists`,
      });
    }

    console.log(
      `User with ID: ${socket.id} has joined room ${roomData.roomId}`
    );
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
