import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  removeUserFromChat,
  updateChatUsers,
  userClientLogout,
} from "../redux/actions/chatActions";

import { socket } from "../service/socket";
import UserListSidebar from "../components/UserListSidebar";
import Chat from "../components/Chat";
import { useWindowWidth } from "@react-hook/window-size";

export default function ChatPage() {
  const [isOpenUserListSidebar, setIsOpenUserListSidebar] = useState(false);

  const { roomId, chatUsers, chatMessages, userData } = useSelector<any, any>(
    (state) => state.chat
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const screenWidth = useWindowWidth();

  useEffect(() => {
    if (!localStorage.getItem("socketId")) {
      socket.emit("logout", { userId: userData.userId, roomId });
      dispatch(userClientLogout());
      dispatch({ type: "persist/purge" });

      socket.disconnect();
      localStorage.setItem("isLoadedSocketId", "");
      navigate("/");
    }

    localStorage.setItem("socketId", "");
  }, []);

  useEffect(() => {
    socket.on("someone_changed_username", (updatedUser: User) => {
      dispatch(updateChatUsers(updatedUser));
    });

    socket.on("someone_disconnected", (userId: string) => {
      dispatch(removeUserFromChat(userId));
    });
  }, [socket]);

  return (
    <>
      <div className="flex h-full text-center">
        {/* User list sidebar */}
        <UserListSidebar
          userData={userData}
          chatUsers={chatUsers}
          screenWidth={screenWidth}
          isOpenUserListSidebar={isOpenUserListSidebar}
          setIsOpenUserListSidebar={setIsOpenUserListSidebar}
        />
        {/* Chat */}
        <Chat
          chatMessages={chatMessages}
          roomId={roomId}
          userData={userData}
          screenWidth={screenWidth}
          isOpenUserListSidebar={isOpenUserListSidebar}
          setIsOpenUserListSidebar={setIsOpenUserListSidebar}
        />
      </div>
    </>
  );
}
