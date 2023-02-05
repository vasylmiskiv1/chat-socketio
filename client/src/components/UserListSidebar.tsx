import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RiFileEditLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { IoClose, IoReturnDownBack } from "react-icons/io5";
import { FiUserCheck } from "react-icons/fi";

import { updateClientUserName } from "../redux/actions/chatActions";

import { socket } from "../service/socket";

export default function LeftSidebar({
  userData,
  chatUsers,
  screenWidth,
  isOpenUserListSidebar,
  setIsOpenUserListSidebar,
}: UserSidebarProps) {
  const [isChangeNameMobileInput, setIsChangeNameMobileInput] = useState(false);
  const [changeName, setChangeName] = useState("");

  const { roomId } = useSelector<any, any>((state) => state.chat);

  const dispatch = useDispatch();

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
      setIsChangeNameMobileInput(false);
    }
  };

  return (
    <>
      {screenWidth < 1024 && isOpenUserListSidebar ? (
        <div
          className={`${
            isOpenUserListSidebar ? `block` : `hidden`
          } absolute h-screen w-2/3 bg-green-400 p-5 z-20 flex flex-col border-r border-gray-200`}
        >
          <div
            className="mr-auto cursor-pointer"
            onClick={() => setIsOpenUserListSidebar(false)}
          >
            <IoClose size={30} />
          </div>
          <div className="text-lg mt-5">
            Room: <span className="font-semibold ">{roomId}</span>
          </div>
          <h1 className="text-lg font-medium mt-5">Users</h1>
          <ul className="mt-2 divide-y">
            {isChangeNameMobileInput ? (
              <div className="flex flex-col">
                <div>Change your name:</div>
                <input
                  className="mt-2 py-2 px-4 rounded outline-none"
                  type="text"
                  value={changeName}
                  onChange={(e) => {
                    setChangeName(e.target.value);
                  }}
                />
                <div className="flex justify-end gap-5 mt-4">
                  <button
                    className="bg-red-200 basis-1/5 py-2 px-6 flex justify-center items-center gap-4 rounded-lg transition hover:bg-red-300 duration-200"
                    onClick={() => setIsChangeNameMobileInput(false)}
                  >
                    <IoReturnDownBack />
                  </button>
                  <button
                    className="bg-blue-400 basis-4/5 py-2 px-8 rounded-lg flex justify-center items-center gap-4 transition hover:bg-blue-500 duration-200"
                    onClick={onChangeUserName}
                    type="submit"
                  >
                    <FiUserCheck />
                  </button>
                </div>
              </div>
            ) : (
              <div
                className="mt-5 py-2 px-10 text-lg flex justify-between items-center gap-5 rounded-lg transition font-semibold bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-400 hover:to-blue-600 duration-200 cursor-pointer"
                onClick={() => setIsChangeNameMobileInput(true)}
              >
                {userData.userName}

                <RiFileEditLine />
              </div>
            )}

            <hr
              style={{
                backgroundColor: "#c0c0c0",
                height: 2,
                marginTop: "20px",
              }}
            />
            {chatUsers.map(
              (user: User) =>
                user.userId !== userData.userId && (
                  <div
                    key={user.userId}
                    className={`mt-5 py-2 px-10 text-lg flex justify-between items-center rounded-lg transition-all bg-gradient-to-r from-green-400 to-gray-200 hover:from-green-400 hover:to-gray-300 duration-200 cursor-pointer`}
                  >
                    <div className="font-semibold">{user.userName}</div>
                    <CgProfile />
                  </div>
                )
            )}
          </ul>
        </div>
      ) : (
        // Desktop
        <div className="max-lg:hidden w-1/6 h-screen overflow-y-scroll bg-green-400 pb-5">
          <div className="p-4">
            <h1 className="text-lg font-medium">Users</h1>
            <ul className="mt-5 divide-y">
              {isChangeNameMobileInput ? (
                <div className="flex flex-col">
                  <div>Change your name:</div>
                  <input
                    className="mt-2 py-2 px-4 rounded outline-none"
                    type="text"
                    value={changeName}
                    onChange={(e) => {
                      setChangeName(e.target.value);
                    }}
                  />
                  <div className="flex gap-4 mt-5">
                    <button
                      className="bg-red-200 basis-1/5 py-2 px-6 flex justify-center items-center gap-4 rounded-lg transition hover:bg-red-300 duration-200"
                      onClick={() => setIsChangeNameMobileInput(false)}
                    >
                      Back <IoReturnDownBack />
                    </button>
                    <button
                      className="bg-blue-400 basis-4/5 py-2 px-8 rounded-lg flex justify-center items-center gap-4 transition hover:bg-blue-500 duration-200"
                      onClick={onChangeUserName}
                    >
                      Submit <FiUserCheck />
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className="mt-5 py-2 px-10 text-lg flex justify-between gap-5 rounded-lg transition-all font-semibold bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-400 hover:to-blue-600 duration-500 cursor-pointer"
                  onClick={() =>
                    setIsChangeNameMobileInput(!isChangeNameMobileInput)
                  }
                >
                  {userData.userName}
                  <button
                    onClick={() => {
                      setIsChangeNameMobileInput(!isChangeNameMobileInput);
                    }}
                    type="submit"
                  >
                    <RiFileEditLine />
                  </button>
                </div>
              )}

              <hr
                style={{
                  backgroundColor: "#c0c0c0",
                  height: 2,
                  marginTop: "20px",
                }}
              />
              {chatUsers.map(
                (user: User) =>
                  user.userId !== userData.userId && (
                    <div
                      key={user.userId}
                      className={`mt-5 py-2 px-10 text-lg flex justify-between items-center rounded-lg transition-all bg-gradient-to-r from-green-400 to-gray-200 hover:from-green-400 hover:to-gray-300 duration-200 cursor-pointer`}
                    >
                      <div className="font-semibold">{user.userName}</div>
                      <CgProfile />
                    </div>
                  )
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
