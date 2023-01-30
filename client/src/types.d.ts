interface State {
  roomId: string;
  chatUsers: User[];
  chatMessages: Message[];
  userData: {};
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

type UserSidebarProps = {
  userData: User;
  chatUsers: User[];
  setIsOpenSidebar: (value: boolean) => void;
  isOpenSidebar: boolean;
}

type ChatProps = {
  chatMessages: Message[];
  roomId: string,
  userData: User;
}

type ChangeNameSidebarProps = {
  userData: User;
  isOpenSidebar: boolean;
  setIsOpenSidebar: (value: boolean) => void;
}
