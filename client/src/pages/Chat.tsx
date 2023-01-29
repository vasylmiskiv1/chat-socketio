import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as io from "socket.io-client";
import moment from "moment";
import EmojiPicker from "emoji-picker-react";

import { IoClose } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { BiMailSend } from "react-icons/bi";
import { FaRegSmileBeam } from "react-icons/fa";

import {
  getChatUsers,
  removeUserFromChat,
  setMessage,
  updateChatUsers,
  updateClientUserName,
} from "../redux/actions/chatActions";

import { socket } from "../service/socket";

export default function Chat() {
  const [writeMessage, setWriteMessage] = useState("");
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [isOpenEmoji, setIsOpenEmoji] = useState(false);

  const { roomId, chatUsers, chatMessages, userData } = useSelector<any, any>(
    (state) => state.chatRoom
  );

  const [changeName, setChangeName] = useState(userData.userName);

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
        time: moment().format("lll"),
      };

      await socket.emit("send_message", newMessage);

      dispatch(setMessage(newMessage));
    }

    setWriteMessage("");
  };

  useEffect(() => {
    if (!userData.userId) {
      navigate("/");
    }

    socket.on("update_room_users", (data) => {
      updateChatUsers(data.chatUsers);
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    if (socket) {
      socket.on("receive_message", (data: any) => {
        dispatch(setMessage(data));
      });
    }

    socket.on("someone_joined_room", (data: any) => {
      dispatch(getChatUsers(data.chatUsers));
    });

    socket.on("someone_changed_username", (updatedUser: any) => {
      dispatch(updateChatUsers(updatedUser));
    });

    socket.on("someone_disconnected", (userId: any) => {
      dispatch(removeUserFromChat(userId));
    })
  }, [socket]);

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onChangeUserName = async () => {
    if (changeName !== userData.userName) {
      await socket.emit("change__username", {
        userName: changeName,
        userId: userData.userId,
      });
      dispatch(
        updateClientUserName({ userId: userData.userId, userName: changeName })
      );
    }
  };

  return (
    <>
      <div className="flex h-full text-center">
        {/* Left sidebar */}
        <div className="w-1/6 h-screen overflow-y-scroll bg-gray-100 pb-5">
          <div className="p-4">
            <h1 className="text-lg font-medium">Users</h1>

            <ul className="mt-5 divide-y">
              <div className="mt-5 py-2 px-10 text-lg flex justify-between gap-5 rounded-lg transition-all font-semibold bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 hover:bg-green-300 duration-200">
                {userData.userName}
                <button
                  onClick={() => {
                    setIsOpenSidebar(!isOpenSidebar);
                  }}
                >
                  <CgProfile />
                </button>
              </div>
              <hr
                style={{
                  backgroundColor: "#c0c0c0",
                  height: 2,
                  marginTop: "20px",
                }}
              />
              {chatUsers.map(
                (user: any) =>
                  user.userId !== userData.userId && (
                    <li
                      key={user.userId}
                      className={`mt-5 py-2 px-10 text-lg flex justify-between gap-5 rounded-lg transition-all bg-gray-200 hover:bg-gray-300 duration-200`}
                    >
                      <div className="font-semibold">{user.userName}</div>
                      <button
                        onClick={() => {
                          setIsOpenSidebar(!isOpenSidebar);
                        }}
                      >
                        <CgProfile />
                      </button>
                    </li>
                  )
              )}
            </ul>
          </div>
        </div>
        <div className="w-5/6 h-screen flex flex-col">
          <div className="mt-top py-4 flex-start bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex px-20 items-center">
            <div>
              Room: <span className="font-bold">{roomId}</span>
            </div>
          </div>
          {/* Chat mesages list */}
          <div className="h-[100%] overflow-y-scroll bg-blue-100">
            <div className="px-20 py-5 flex flex-col gap-5">
              {chatMessages.map((message: any, i: number) => (
                <>
                  <div
                    key={i}
                    className={`max-w-[300px] w-full rounded-lg p-4 ${
                      message.userId === userData.userId
                        ? `bg-gradient-to-r from-green-400 to-green-500 ml-auto`
                        : `bg-white`
                    }  `}
                  >
                    <div className="flex text-lg gap-4">
                      <p className="bg-red-200 rounded-full p-1 w-[35px] h-[35px]"></p>
                      <p className="font-semibold">{message.userName}</p>
                    </div>
                    <p className="text-gray-800 mt-2 text-base text-left">
                      {message.message}
                    </p>
                    <p className="text-gray-500 text-xs mt-2 text-right">
                      {message.time}
                    </p>
                  </div>
                  <div ref={messagesEndRef} />
                </>
              ))}
            </div>
          </div>
          {/* Write a message section */}
          <div className="mt-auto w-full grow-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <form className="py-4 h-full left-0 right-0 flex m-auto px-10 justify-center items-center gap-5 max-w-[800px]">
              <div className="bg-white w-full flex rounded-lg">
                <div
                  className="flex justify-center items-center p-4 cursor-pointer"
                  onClick={() => setIsOpenEmoji(!isOpenEmoji)}
                >
                  <FaRegSmileBeam size={20} />
                </div>
                <input
                  className="w-full bg-input-color px-1 py-4 rounded-lg outline-none transition-all focus:bg-white duration-500"
                  type="text"
                  value={writeMessage}
                  placeholder="Write a message..."
                  onChange={(e) => setWriteMessage(e.target.value)}
                />
              </div>
              {/* {isOpenEmoji && (
                <div className="absolute bottom-14">
                  <EmojiPicker />
                </div>
              )} */}
              <button
                className="bg-blue-400 text-white w-[55px] h-[50px] flex justify-center items-center rounded-full hover:bg-blue-500"
                type="submit"
                onClick={(e) => sendMessage(e)}
              >
                <BiMailSend size={30} />
              </button>
            </form>
          </div>
        </div>
        <div
          className={`fixed h-screen p-4 w-1/6 bg-right-sidebar right-0 flex flex-col ${
            isOpenSidebar ? "block" : "hidden"
          }`}
        >
          <div
            className="ml-auto cursor-pointer"
            onClick={() => setIsOpenSidebar(false)}
          >
            <IoClose size={30} />
          </div>
          <div className="mt-20 font-semibold">Your Name: {changeName}</div>
          <input
            type="text"
            value={changeName}
            className="mt-2 py-2 px-4 rounded-lg"
            onChange={(e) => {
              setChangeName(e.target.value);
            }}
          />
          <button
            className={`p-2 mt-5 ${
              changeName === userData.userName || !changeName
                ? `bg-gray-600 cursor-not-allowed`
                : `bg-blue-500 hover:bg-blue-600 duration-400`
            } text-white rounded-lg transition `}
            onClick={onChangeUserName}
          >
            Change your name
          </button>
        </div>
      </div>
    </>
  );
}
