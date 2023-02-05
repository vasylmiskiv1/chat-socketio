import { RiFileEditLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";

export default function LeftSidebar({
  userData,
  chatUsers,
  screenWidth,
  isOpenUserListSidebar,
  setIsOpenUserListSidebar,
  isOpenChangeNameSidebar,
  setIsOpenChangeNameSidebar,
}: UserSidebarProps) {
  const { roomId } = useSelector<any, any>((state) => state.chat);

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
            <div
              className="mt-5 py-2 px-10 text-lg flex justify-between gap-5 rounded-lg transition-all font-semibold bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-400 hover:to-blue-600 duration-500 cursor-pointer"
              onClick={() =>
                setIsOpenChangeNameSidebar(!isOpenChangeNameSidebar)
              }
            >
              {userData.userName}
              <button
                onClick={() => {
                  setIsOpenChangeNameSidebar(!isOpenChangeNameSidebar);
                }}
              >
                <RiFileEditLine />
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
        <div className="max-lg:hidden w-1/6 h-screen overflow-y-scroll bg-green-400 pb-5">
          <div className="p-4">
            <h1 className="text-lg font-medium">Users</h1>
            <ul className="mt-5 divide-y">
              <div
                className="mt-5 py-2 px-10 text-lg flex justify-between gap-5 rounded-lg transition-all font-semibold bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-400 hover:to-blue-600 duration-500 cursor-pointer"
                onClick={() =>
                  setIsOpenChangeNameSidebar(!isOpenChangeNameSidebar)
                }
              >
                {userData.userName}
                <button
                  onClick={() => {
                    setIsOpenChangeNameSidebar(!isOpenChangeNameSidebar);
                  }}
                >
                  <RiFileEditLine />
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
