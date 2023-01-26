import {
  SET_USER,
  SET_ROOM_ID,
  SET_MESSAGE,
} from "../actionTypes";

export function setRoomId(roomId: string) {
  return {
    type: SET_ROOM_ID,
    payload: roomId,
  };
}

export function setUser(username: any) {
  return {
    type: SET_USER,
    payload: username,
  };
}

export function setMessage(message: any) {
  return {
    type: SET_MESSAGE,
    payload: message,
  };
}

