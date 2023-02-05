import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import startImage from "../assets/start-image.jpg";
import {
  setRoomId,
  setClientUserData,
  getChatUsers,
  userClientLogout,
} from "../redux/actions/chatActions";

import { socket } from "../service/socket";

export default function StartPage() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const dispatch = useDispatch();

  const { userData, loadedSocketId } = useSelector<any, any>(
    (state) => state.chat
  );

  const isLoadedSocketId = localStorage.getItem("isLoadedSocketId");

  useEffect(() => {
    dispatch(userClientLogout());
    dispatch({ type: "persist/purge" });
    socket.emit("get_socketId");
    localStorage.setItem("isLoadedSocketId", "true");
  }, []);

  useEffect(() => {
    if (!isLoadedSocketId) {
      window.location.reload();
    }
  }, [loadedSocketId]);

  useEffect(() => {
    socket.on("send_socketId", (socketId: string) => {
      localStorage.setItem("socketId", socketId);
      localStorage.setItem("isLoadedSocketId", "true");
    });

    socket.on("joined_room", (data: joinedRoomData) => {
      dispatch(setRoomId(data.roomId));
      dispatch(getChatUsers(data.roomUsers));
      dispatch(setClientUserData(data.userData));
    });
  }, [socket]);

  const joinRoom = () => {
    const roomData = {
      userName: username,
      roomId: room,
    };

    if (username && room && !userData.userId) {
      socket.emit("join_room", roomData);
    }
  };

  return (
    <>
      <div className="flex h-screen basis-0">
        <img src={startImage} alt="start" className="max-xl:hidden h-screen w-full" />
        <div className="w-full max-xl:px-5 px-20 text-center flex flex-col justify-center items-center">
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
            <Link to={`/chat/${room}`}>
              <button
                type="button"
                className="mt-10 px-4 py-2 bg-green-400 rounded text-white transition hover:bg-green-500 duration-300"
                onClick={joinRoom}
              >
                Join the room
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
