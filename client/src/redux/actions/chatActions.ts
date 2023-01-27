import {
  SET_USER_OWNER,
  UPDATE_CHAT_USERS,
  SET_ROOM_ID,
  SET_MESSAGE,
} from "../actionTypes";

export function setRoomId(roomId: string) {
  return {
    type: SET_ROOM_ID,
    payload: roomId,
  };
}

export function setUserOwner(username: any) {
  return {
    type: SET_USER_OWNER,
    payload: username,
  };
}

export function updateChatUsers(users: any) {
  return {
    type: UPDATE_CHAT_USERS,
    payload: users,
  };
}

export function setMessage(message: any) {
  return {
    type: SET_MESSAGE,
    payload: message,
  };
}

