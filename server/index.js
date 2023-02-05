const express = require("express");

const app = express();
const http = require("http");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const { Server } = require("socket.io");

app.use(cors());

const __rootdir = path.resolve();

app.use(express.static(path.join(__rootdir, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__rootdir, "client", "build", "index.html"));
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let roomUsers = {};

io.on("connection", (socket) => {
  // console.log(`User Connected: ${socket.id}`);

  socket.on("get_socketId", () => {
    socket.emit("send_socketId", socket.id);
  });

  socket.on("join_room", (data) => {
    // console.log(data);
    const userData = { userName: data.userName, userId: socket.id };

    socket.join(data.roomId);

    if (!roomUsers[data.roomId]) {
      roomUsers[data.roomId] = [];
    }

    roomUsers[data.roomId].push(userData);

    // console.log(roomUsers);

    io.to(data.roomId).emit("joined_room", {
      userData,
      roomId: data.roomId,
      roomUsers: roomUsers[data.roomId],
    });
  });

  socket.on("change_username", (data) => {
    roomUsers[data.roomId] = roomUsers[data.roomId].map((user) =>
      user.userId === data.userId ? { ...user, userName: data.userName } : user
    );

    const updatedUser = {
      userId: data.userId,
      userName: data.userName,
    };

    io.to(data.roomId).emit("someone_changed_username", updatedUser);
    // console.log(roomUsers);
  });

  socket.on("send_message", (data) => {
    // console.log(data);
    io.to(data.roomId).emit("receive_message", data);
  });

  socket.on("logout", (data) => {
    // console.log(data);
    if (roomUsers[data.roomId]) {
      roomUsers[data.roomId] = roomUsers[data.roomId].filter(
        (user) => user.userId !== data.userId
      );
    }

    if (roomUsers[data.roomId] && roomUsers[data.roomId].length) {
      io.to(data.roomId).emit("someone_disconnected", data.userId);
    } else {
      delete roomUsers[data.roomId];
    }
    // console.log(roomUsers);
  });

  socket.on("disconnect", () => {
    // console.log(`User Disconnected: ${socket.id}`);

    for (const room in roomUsers) {
      for (let i = 0; i < roomUsers[room].length; i++) {
        if (roomUsers[room][i].userId === socket.id) {
          socket.leave(room);
          io.to(room).emit("someone_disconnected", socket.id);
          roomUsers[room].splice(i, 1);
        }
      }
    }
  });
});

server.listen(process.env.SERVER_PORT || 5000, () => {
  console.log(`Server running on port ${process.env.SERVER_PORT || 5000}`);
});
