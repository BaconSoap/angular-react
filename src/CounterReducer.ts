import { AnyAction } from "redux";

export const counter = (state = { count: 0 }, action: AnyAction) => {
  if (action.type === 'increment') {
    return {
      ...state,
      count: state.count + 1
    };
  }

  return state;
};
