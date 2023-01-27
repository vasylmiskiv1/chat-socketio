import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as io from "socket.io-client";
import { setMessage, updateChatUsers } from "../redux/actions/chatActions";

const socket = io.connect("http://localhost:5000");

export default function Chat() {
  const [writeMessage, setWriteMessage] = useState("");

  const { roomId, chatUsers, chatMessages, userData } = useSelector<any, any>(
    (state) => state.chatRoom
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sendMessage = async (e: any) => {
    e.preventDefault();

    if (writeMessage) {
      const newMessage = {
        userId: userData.userId,
        userName: userData.userName,
        message: writeMessage,
        roomId,
        time: moment().format('lll'),
      };

      await socket.emit("send_message", newMessage);

      dispatch(setMessage(newMessage));
    }

    setWriteMessage("");
  };

  useEffect(() => {
    if(!userData.userId) {
      navigate('/');
    }
    socket.on("update_room_users", (data) => {
      updateChatUsers(data.chatUsers);
    })
  }, [socket])

  useEffect(() => {
    if (socket) {
      socket.on("receive_message", (data: any) => {
        dispatch(setMessage(data));
      });
    }
  }, [socket]);

  useEffect(() => {
    socket.on("someone_joined_room", (data: any) => {
      console.log(data.chatUsers);
      dispatch(updateChatUsers(data.chatUsers));
    })
  }, [socket]);

  return (
    <div className="flex h-screen text-center">
      <div className="w-1/6 bg-gray-200">
        <div className="p-4">
          <h1 className="text-lg font-medium">Users</h1>
          <ul>
            {chatUsers.map((user: any) => (
              <li key={user.userId}>{user.userName}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-4/6 bg-white p-4">
        <div className="h-full relative border-2 bg-blue-100 rounded-lg">
          <div className="h-[88%] overflow-y-scroll bg-blue-100 rounded-lg">
          <div className="px-10 py-5 flex flex-col gap-5">
          {chatMessages.map((message: any, i: number) => (
              <div
              key={i}
                className={`max-w-[300px] w-full rounded-lg p-4 ${
                  message.userId === userData.userId
                    ? `bg-green-400 ml-auto`
                    : `bg-white`
                }  `}
              >
                <div className="flex text-lg gap-4">
                <p className="bg-red-200 rounded-full p-1 w-[35px] h-[35px]"></p>
                <p className="font-semibold">
                  {message.userName}
                </p>
                </div>
                <p className="text-gray-500 mt-2 text-left">{message.message}</p>
                <p className="text-gray-500 text-right">{message.time}</p>
              </div>
            ))}
          </div>
          </div>
          <form className="absolute bottom-5 w-full flex gap-5 px-5">
              <input
                className="w-full bg-input-color p-4 rounded-lg outline-none transition-all focus:bg-white duration-500"
                type="text"
                value={writeMessage}
                onChange={(e) => setWriteMessage(e.target.value)}
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
