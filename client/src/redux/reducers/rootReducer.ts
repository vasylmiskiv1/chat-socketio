import {
  SET_CLIENT_USER_DATA,
  UPDATE_CLIENT_USER_NAME,
  SET_ROOM_ID,
  GET_CHAT_USERS,
  UPDATE_CHAT_USERS,
  REMOVE_USER_FROM_CHAT,
  SET_MESSAGE,
  USER_CLIENT_LOGOUT,
} from "../constants";

const initialState = {
  roomId: "",
  chatUsers: [] as any,
  chatMessages: [],
  userData: {},
};

export function chatRoom(state = initialState, action: ActionReducer) {
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
        chatUsers: state.chatUsers.map((chatUser: User) =>
          chatUser.userId === action.payload.userId ? action.payload : chatUser
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
        chatUsers: state.chatUsers.map((chatUser: User) =>
          chatUser.userId === action.payload.userId ? action.payload : chatUser
        ),
      };

    case REMOVE_USER_FROM_CHAT:
      return {
        ...state,
        chatUsers: state.chatUsers.filter(
          (chatUser: User) => chatUser.userId !== action.payload
        ),
      };

    case SET_MESSAGE:
      return {
        ...state,
        chatMessages: [...state.chatMessages, action.payload],
      };

    case USER_CLIENT_LOGOUT:
      return {
        roomId: "",
        chatUsers: [],
        chatMessages: [],
        userData: {},
      };
    default:
      return state;
  }
}
