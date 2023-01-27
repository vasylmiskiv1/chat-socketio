import { useRouteLoaderData } from "react-router-dom";
import {
  SET_USER_OWNER,
  UPDATE_CHAT_USERS,
  SET_ROOM_ID,
  SET_MESSAGE,
} from "../actionTypes";

const initialState = {
  roomId: "",
  chatUsers: [],
  chatMessages: [],
  userData: {},
};

export function chatRoom(state = initialState, action: any) {
  switch (action.type) {
    case SET_USER_OWNER:
      return {
        ...state,
        userData: { ...action.payload },
      };
      case UPDATE_CHAT_USERS:
      return {
        ...state,
        chatUsers: [...action.payload],
      };
    case SET_ROOM_ID:
      return {
        ...state,
        roomId: action.payload,
      };
    case SET_MESSAGE:
      return {
        ...state,
          chatMessages: [...state.chatMessages, action.payload],
      };
    default:
      return state;
  }
}
