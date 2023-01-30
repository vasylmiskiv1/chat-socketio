import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { IoClose } from "react-icons/io5";

import { updateClientUserName } from "../redux/actions/chatActions";

import { socket } from "../service/socket";

export default function ChangeNameSidebar({userData, isOpenSidebar, setIsOpenSidebar}: ChangeNameSidebarProps) {

  const [changeName, setChangeName] = useState(userData.userName);

  const dispatch = useDispatch();

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
    <div
      className={`fixed h-screen p-4 w-1/6 bg-chat-right-sidebar right-0 flex flex-col ${
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
        } text-primary rounded-lg transition `}
        onClick={onChangeUserName}
      >
        Change your name
      </button>
    </div>
  );
}
