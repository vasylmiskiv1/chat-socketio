import * as io from "socket.io-client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import startImage from "../assets/start-image.jpg";
import { setRoomId, setUser } from "../redux/actions/chatActions";

const socket = io.connect("http://localhost:5000");

export default function StartPage() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("joined_room", (response: any) => {
      const { roomId, userData } = response;
      dispatch(setRoomId(roomId));
      dispatch(setUser(userData));
      navigate("/chat");
    });
  }, [socket]);

  const joinRoom = () => {
    const roomData = {
      userName: username,
      roomId: room,
    };

    if (username && room) {
      socket.emit("join_room", roomData);
    }
  };

  return (
    <>
      <div className="flex basis-0">
        <img src={startImage} alt="start" className="h-screen w-full" />
        <div className="w-full py-40 px-20 text-center flex flex-col items-center">
          <h1 className="text-4xl text-green-800 font-bold">
            Welcome to the Live Chat
          </h1>
          <div className="mt-20 text-xl">Join to the chat</div>
          <div className="max-width[300px]">
            <input
              type="text"
              placeholder="John..."
              className="mt-10 w-full px-4 py-2 bg-gray-100 border-2 outline-none border-green-800 rounded transition focus:bg-white duration-300"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="Room ID..."
              className="mt-10 w-full px-4 py-2 bg-gray-100 border-2 outline-none border-green-800 rounded transition focus:bg-white duration-300"
              onChange={(e) => setRoom(e.target.value)}
            />
            <button
              type="button"
              className="mt-10 px-4 py-2 bg-green-400 rounded text-white transition hover:bg-green-500 duration-300"
              onClick={joinRoom}
            >
              Join the room
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
