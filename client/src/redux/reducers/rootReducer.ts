import { SET_USER, SET_ROOM_ID } from "../actionTypes";

const initialState = {
  roomId: "",
  userData: {},
};

export function chatRoom(state = initialState, action: any) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        userData: { ...action.payload, messages: [] },
      };
    case SET_ROOM_ID:
      return {
        ...state,
        roomId: action.payload,
      };
    default:
      return state;
  }
}
