import {
  SET_CLIENT_USER_DATA,
  UPDATE_CLIENT_USER_NAME,
  UPDATE_CHAT_USERS,
  SET_ROOM_ID,
  REMOVE_USER_FROM_CHAT,
  GET_CHAT_USERS,
  SET_MESSAGE,
  USER_CLIENT_LOGOUT,
} from "../constants";

export function setRoomId(roomId: string) {
  return {
    type: SET_ROOM_ID,
    payload: roomId,
  };
}

export function setClientUserData(username: string) {
  return {
    type: SET_CLIENT_USER_DATA,
    payload: username,
  };
}

export function getChatUsers(users: User[]) {
  return {
    type: GET_CHAT_USERS,
    payload: users,
  };
}

export function updateClientUserName(updatedUser: User) {
  return {
    type: UPDATE_CLIENT_USER_NAME,
    payload: updatedUser,
  };
}

export function updateChatUsers(user: User) {
  return {
    type: UPDATE_CHAT_USERS,
    payload: user,
  };
}

export function setMessage(message: Message) {
  return {
    type: SET_MESSAGE,
    payload: message,
  };
}

export function removeUserFromChat(userId: string) {
  return {
    type: REMOVE_USER_FROM_CHAT,
    payload: userId,
  };
}

export function userClientLogout() {
  return {
    type: USER_CLIENT_LOGOUT,
  };
}
