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

  const { id, users, messages } = useSelector<any, any>(
    (state) => state.chatRoom
  );

  // const navigate = useNavigate();


  // useEffect(() => {
  //   if (!chatRoom.length) {
  //     navigate("/");
  //   }
  // }, [chatRoom]);

  // const sendMessage = async () => {
  //   if (message) {
  //     await socket.emit("send_message", {
  //       username,
  //       message,
  //       room,
  //       time: `${new Date(Date.now()).getHours()}:${new Date(
  //         Date.now()
  //       ).getMinutes()}`,
  //     });
  //   }

  //   setMessage("");
  // };

  // useEffect(() => {
  //   socket.on("receive_message", (data: any) => {
  //     console.log(data);
  //   });
  // }, [socket]);

  // useEffect(() => {
  //   socket.on("join_room", (data) => {
  //     console.log(data);
  //   });
  // }, [socket]);

  // const users = [
  //   { id: 123, name: "123" },
  //   { id: 456, name: "456" },
  // ];

  // const messages = [{ id: 12312, text: "hello", user: { name: "Va" } }];

  return (
    <div className="flex h-screen text-center">
      <div className="w-1/6 bg-gray-200">
        <div className="p-4">
          <h1 className="text-lg font-medium">Users</h1>
          <ul>
            {users.map((user: any) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-4/6 bg-white p-4">
        <h1 className="text-2xl font-medium">{id} </h1>
        <div className="h-[80%] overflow-y-scroll">
          {messages.map((message: any) => (
            <div key={message.id} className="bg-green-400 w-[100px] rounded-lg">
              <p className="text-gray-700">{message.text}</p>
              <p className="text-gray-500">{message.user.name}</p>
            </div>
          ))}
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
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
