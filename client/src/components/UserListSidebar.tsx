import { CgProfile } from "react-icons/cg";

export default function LeftSidebar({
  userData,
  chatUsers,
  setIsOpenSidebar,
  isOpenSidebar,
}: UserSidebarProps) {
  return (
    <div className="w-1/6 h-screen overflow-y-scroll bg-green-400 pb-5">
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
            (user: User) =>
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
  );
}
