import {
  SET_USER,
  SET_ROOM_ID,
  SET_MESSAGE,
} from "../actionTypes";

const initialState = {
  roomId: "",
  chatMessages: [],
  userData: {},
};

export function chatRoom(state = initialState, action: any) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        userData: { ...state.userData, ...action.payload },
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
