interface UserData {
  userId?: string;
  userName?: string;
}

interface State {
  roomId: string;
  chatUsers: User[];
  chatMessages: Message[];
  userData: UserData;
}

interface Action {
  type: string;
  payload: any;
}

interface User {
  userId: string;
  userName: string;
}

interface Message {
  userId: string;
  userName: string;
  message: string;
  roomId: string;
  time: string;
}

interface joinedRoomData {
  roomId: string;
  userData: UserData;
  roomUsers: User[];
}

// Components properties

type UserSidebarProps = {
  userData: User;
  chatUsers: User[];
  screenWidth: number;
  isOpenUserListSidebar: boolean;
  setIsOpenUserListSidebar: (value: boolean) => void;
}

type ChatProps = {
  chatMessages: Message[];
  roomId: string,
  userData: User;
  screenWidth: number;
  isOpenUserListSidebar: boolean;
  setIsOpenUserListSidebar: (value: boolean) => void;
}

type ChangeNameSidebarProps = {
  userData: User;
  isOpenChangeNameSidebar: boolean;
  setIsOpenChangeNameSidebar: (value: boolean) => void;
}
