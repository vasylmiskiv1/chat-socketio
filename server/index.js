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

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__rootdir, "client", "build", "index.html"));
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let chatUsers = [];

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    console.log(data);
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
    chatUsers = [
      ...chatUsers.map((user) =>
        user.userId === data.userId
          ? { ...user, userName: data.userName }
          : user
      ),
    ];

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
    chatUsers = chatUsers.filter((chatUser) => chatUser.userId !== socket.id);

    socket.broadcast.emit("someone_disconnected", socket.id);
  });
});

server.listen(process.env.SERVER_PORT || 5000, () => {
  console.log(`Server running on port ${process.env.SERVER_PORT || 5000}`);
});
