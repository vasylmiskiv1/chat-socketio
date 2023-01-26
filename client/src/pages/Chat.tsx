import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as io from "socket.io-client";
import { setMessage } from "../redux/actions/chatActions";

const socket = io.connect("http://localhost:5000");

export default function Chat() {
  const [writeMessage, setWriteMessage] = useState("");

  const { roomId, chatMessages, userData } = useSelector<any, any>(
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
        time: `${new Date(Date.now()).getHours()}:${new Date(
          Date.now()
        ).getMinutes()}`,
      };

      await socket.emit("send_message", newMessage);

      dispatch(setMessage(newMessage));
    }

    setWriteMessage("");
  };

  // Check if user is logged in if not redirect to login page
  useEffect(() => {
    if(!userData.userId) {
      navigate('/');
    }
  }, [])

  useEffect(() => {
    if (socket) {
      socket.on("receive_message", (data: any) => {
        dispatch(setMessage(data));
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
        <div className="h-full relative border-2 bg-blue-100 rounded-lg">
          <div className="h-[88%] overflow-y-scroll bg-blue-100 rounded-lg">
          <div className="px-20 py-5 flex flex-col gap-5">
          {chatMessages.map((message: any) => (
              <div
                className={`max-w-[300px] w-full rounded-lg p-4 ${
                  message.userId === userData.userId
                    ? `bg-green-400 ml-auto`
                    : `bg-white`
                }  `}
              >
                <p className="text-lg font-semibold text-left">
                  {message.userName}
                </p>
                <p className="text-gray-500 text-left">{message.message}</p>
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
