import React, { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { useDispatch } from "react-redux";
import moment from "moment";

import { BiMailSend } from "react-icons/bi";
import { FaRegSmileBeam } from "react-icons/fa";
import { GoTriangleRight } from "react-icons/go";
import { GoTriangleLeft } from "react-icons/go";
import { FiLogOut } from "react-icons/fi";

import { setMessage, userClientLogout } from "../redux/actions/chatActions";

import { socket } from "../service/socket";
import { useNavigate } from "react-router-dom";

import chatLogo from "../assets/chat-logo.svg";

export default function Chat({ chatMessages, roomId, userData }: ChatProps) {
  const [writeMessage, setWriteMessage] = useState("");
  const [isOpenEmoji, setIsOpenEmoji] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

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

  const onLogout = () => {
    socket.emit("logout");
    dispatch(userClientLogout());
    dispatch({ type: 'persist/purge' });
    navigate('/');
  }

  return (
    <div className="w-5/6 h-screen flex flex-col">
      {/* Header */}
      <div className="mt-top py-4 flex-start bg-green-400 flex justify-between px-20 items-center">
        <div>
          Room: <span className="font-bold ">{roomId}</span>
        </div>
        <div className=" flex gap-5 justify-center items-center">
          <div className="font-semibold text-lg">Chat</div>
          <img src={chatLogo} alt="chat" className="w-[30px]"/>
        </div>
        <div
          className="flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-95 duration-200"
          onClick={onLogout}
        >
          Logout <FiLogOut size={20} />
        </div>
      </div>
      {/* Chat mesages list */}
      <div className="h-[100%] overflow-y-scroll bg-chat-messages-field">
        <div className="px-20 py-5 flex flex-col gap-5">
          {chatMessages.length ? chatMessages.map((message: Message, index: number) => (
            <div key ={index}>
              <div className="relative">
                <div
                  className={`max-w-[400px] w-full rounded-lg p-4 break-words ${
                    message.userId === userData.userId
                      ? `bg-blue-300 ml-auto`
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
                  <p className="text-gray-600 text-xs mt-5 text-right">
                    {message.time}
                  </p>
                </div>
                {message.userId === userData.userId ? (
                  <div className="absolute bottom-[-3px] right-[-21px]">
                    <GoTriangleRight size={35} color="#93c5fd" />
                  </div>
                ) : (
                  <div className={`absolute bottom-[-3px] left-[-21px]`}>
                    <GoTriangleLeft size={35} color="white" />
                  </div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </div>
          )) : null}
        </div>
      </div>
      {/* Write a message section */}
      <div className="mt-auto w-full grow-1 bg-chat-messages-field">
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
  );
}
