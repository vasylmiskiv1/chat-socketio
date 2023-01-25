import { SET_USER, SET_ROOM_ID } from "../actionTypes";

const initialState = {
  id: "",
  users: [],
  messages: [],
  loading: false,
  error: null,
};

export function chatRoom(state = initialState, action: any) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        users: [...state.users, {name: action.payload, messages: []}],
      };
    case SET_ROOM_ID:
      return {
        ...state,
        id: action.payload,
      };
    default:
      return state;
  }
}
