import * as actionType from "../actions/actionTypes";
import initialState from "./initialState";

export default function cartReducer(state = initialState.cart, action) {
  switch (action.type) {
    case actionType.ADD_TO_CART:
      var addedItem = state.find(
        (c) => c.product.id === action.payload.product.id
      );
      if (addedItem) {
        //cartta item varsa cartta bulunan item sayısını 1 arttır.
        var newState = state.map((cartItem) => {
          if (cartItem.product.id === action.payload.product.id) {
            return Object.assign({}, addedItem, {
              quantity: addedItem.quantity + 1,
            });
          }
          return cartItem;
        });
        return newState;
      } else {
        //cartta item yoksa cartın kopyasını al gönderdiğim itemi ekle döndür.
        return [...state, { ...action.payload }];
      }

    case actionType.REMOVE_FROM_CART:
      var removedCart = state.filter((cartItem) => cartItem.product.id !== action.payload.id);
      return removedCart;

    default:
      return state;
  }
}
