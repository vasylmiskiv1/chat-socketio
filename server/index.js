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

let chatUsers = [];

io.on("connection", (socket) => {
  // console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    const userData = { userName: data.userName, userId: socket.id };

    chatUsers.push(userData);

    socket.join(data.roomId);

    socket.emit("joined_room", {
      roomId: data.roomId,
      chatUsers,
      userData,
    });

    socket.broadcast.emit("someone_joined_room", {
      roomId: data.roomId,
      chatUsers,
    });
  });

  socket.on("change__username", (data) => {
    chatUsers = [...chatUsers.map((user) =>
      user.userId === data.userId ? { ...user, userName: data.userName } : user
    )];

    const updatedUser = {
      userId: data.userId,
      userName: data.userName,
    };

    socket.broadcast.emit("someone_changed_username", updatedUser);
  });

  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
