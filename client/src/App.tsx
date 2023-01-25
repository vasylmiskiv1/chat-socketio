import * as io from "socket.io-client";
import { useState } from "react";

import Chat from './pages/Chat';

const socket = io.connect("http://localhost:5000");

export default function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (username && room) {
      socket.emit("join_room", room );
      setUsername("");
      setRoom("");
    }
  };

  return (
    <>
    <div className="py-10 text-center bg-slate-500 flex flex-col items-center">
      <div className="text-3xl">Join a Chat</div>
      <div className="max-width[500px]">
        <input
          type="text"
          placeholder="John..."
          className="mt-10 w-full px-4 py-2"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Room ID..."
          className="mt-10 w-full px-4 py-2"
          onChange={(e) => setRoom(e.target.value)}
        />
        <button
          type="button"
          className="mt-10 px-4 py-2 bg-white"
          onClick={joinRoom}
        >
          Join the room
        </button>
      </div>
    </div>
    <Chat socket={socket} username={username} room={room} />
    </>
  );
}
