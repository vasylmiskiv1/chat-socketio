import {
  SET_CLIENT_USER_DATA,
  UPDATE_CLIENT_USER_NAME,
  UPDATE_CHAT_USERS,
  SET_ROOM_ID,
  GET_CHAT_USERS,
  SET_MESSAGE,
} from "../constants";

export function setRoomId(roomId: string) {
  return {
    type: SET_ROOM_ID,
    payload: roomId,
  };
}

export function setClientUserData(username: any) {
  return {
    type: SET_CLIENT_USER_DATA,
    payload: username,
  };
}

export function getChatUsers(users: any) {
  return {
    type: GET_CHAT_USERS,
    payload: users,
  };
}

export function updateClientUserName(updatedUser: any) {
  return {
    type: UPDATE_CLIENT_USER_NAME,
    payload: updatedUser,
  };
}

export function updateChatUsers(user: any) {
  return {
    type: UPDATE_CHAT_USERS,
    payload: user,
  }
}


export function setMessage(message: any) {
  return {
    type: SET_MESSAGE,
    payload: message,
  };
}

