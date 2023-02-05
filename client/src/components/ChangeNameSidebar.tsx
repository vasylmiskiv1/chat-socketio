import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";

import { updateClientUserName } from "../redux/actions/chatActions";

import { socket } from "../service/socket";

export default function ChangeNameSidebar({
  userData,
  isOpenChangeNameSidebar,
  setIsOpenChangeNameSidebar,
}: ChangeNameSidebarProps) {
  const [changeName, setChangeName] = useState(userData.userName);

  const dispatch = useDispatch();

  const { roomId } = useSelector<any, any>((state) => state.chat);

  const onChangeUserName = async () => {
    if (changeName !== userData.userName) {
      await socket.emit("change_username", {
        userName: changeName,
        userId: userData.userId,
        roomId,
      });
      dispatch(
        updateClientUserName({ userId: userData.userId, userName: changeName })
      );
      setIsOpenChangeNameSidebar(false);
    }
  };
  return (
    <div
      className={`fixed h-screen p-4 w-1/6 bg-chat-right-sidebar right-0 flex flex-col ${
        isOpenChangeNameSidebar ? "block" : "hidden"
      }`}
    >
      <div
        className="ml-auto cursor-pointer"
        onClick={() => setIsOpenChangeNameSidebar(false)}
      >
        <IoClose size={30} />
      </div>
      <div className="mt-20 text-white text-lg">
        Your Name: <span className="font-semibold">{changeName}</span>
      </div>
      <input
        type="text"
        value={changeName}
        className="mt-10 py-2 px-4 rounded-lg"
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
