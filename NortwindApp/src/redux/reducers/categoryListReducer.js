import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function categoryList(state = initialState.categories, action) {
  switch (action.type) {
    case actionTypes.GET_CATEGORİES_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
