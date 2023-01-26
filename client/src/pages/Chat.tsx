import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as io from "socket.io-client";

type ChatProps = {
  socket: any;
  username: string;
  room: string;
};

const socket = io.connect("http://localhost:5000");

export default function Chat() {
  const [message, setMessage] = useState("");

  const { roomId, userData } = useSelector<any, any>((state) => state.chatRoom);

  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!chatRoom.length) {
  //     navigate("/");
  //   }
  // }, [chatRoom]);

  const sendMessage = async (e: any) => {
    e.preventDefault();

    if (message) {
      await socket.emit("send_message", {
        userName: userData.userName,
        message,
        roomId,
        time: `${new Date(Date.now()).getHours()}:${new Date(
          Date.now()
        ).getMinutes()}`,
      });
    }

    setMessage("");
  };

  useEffect(() => {
    if (socket) {
      socket.on("receive_message", (data: any) => {
        console.log(data);
      });
    }
  }, [socket]);

  useEffect(() => {
    socket.on("join_room", (data) => {
      console.log(data);
    });
  }, [socket]);

  return (
    <div className="flex h-screen text-center">
      <div className="w-1/6 bg-gray-200">
        {/* <div className="p-4">
          <h1 className="text-lg font-medium">Users</h1>
          <ul>
            {users.map((user: any) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </div> */}
      </div>
      <div className="w-4/6 bg-white p-4">
        <h1 className="text-2xl bg-purple-100 rounded-lg mx-10 font-medium">
          {roomId}
        </h1>
        <div className="h-[80%] overflow-y-scroll">
          {/* {messages.map((message: any) => (
            <div key={message.id} className="bg-green-400 w-[100px] rounded-lg">
              <p className="text-gray-700">{message.text}</p>
              <p className="text-gray-500">{message.user.name}</p>
            </div>
          ))} */}
        </div>
        <form className="w-full flex gap-5 px-10">
          <input
            className="w-full bg-gray-200 p-4 rounded-lg"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white rounded-lg min-w-[100px] rounded-full"
            type="submit"
            onClick={(e) => sendMessage(e)}
          >
            Send
          </button>
        </form>
      </div>
      <div>
        <div>
          Your name:{" "}
          <span className="font-semibold text-2xl">{userData.userName}</span>
        </div>
      </div>
    </div>
  );
}
