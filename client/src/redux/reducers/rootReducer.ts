import {
  SET_CLIENT_USER_DATA,
  UPDATE_CLIENT_USER_NAME,
  SET_ROOM_ID,
  GET_CHAT_USERS,
  UPDATE_CHAT_USERS,
  SET_MESSAGE,
} from "../constants";

const initialState = {
  roomId: "",
  chatUsers: [] as any,
  chatMessages: [],
  userData: {},
};

export function chatRoom(state = initialState, action: any) {
  switch (action.type) {
    case SET_CLIENT_USER_DATA:
      return {
        ...state,
        userData: { ...action.payload },
        chatUsers: [{ ...action.payload }],
      };

    case UPDATE_CLIENT_USER_NAME:
      return {
        ...state,
        chatUsers: state.chatUsers.map((chatUser: any) =>
          chatUser.userId === action.payload.userId
            ? action.payload
            : chatUser
        ),
        userData: { ...action.payload },
      };

    case GET_CHAT_USERS:
      return {
        ...state,
        chatUsers: [...action.payload],
      };

    case SET_ROOM_ID:
      return {
        ...state,
        roomId: action.payload,
      };

    case UPDATE_CHAT_USERS:
      return {
        ...state,
        chatUsers: state.chatUsers.map((chatUser: any) =>
          chatUser.userId === action.payload.userId ? action.payload : chatUser
        ),
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
