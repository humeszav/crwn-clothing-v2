import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";




const addCartItem = (cartItems, productToAdd) => {
  // find if cartItems containes productToAdd
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  // If found, increase quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  // return new arrayl with modified cartItem
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
  // find if cartItems containes productToAdd
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );

  // If found, decrease quantity
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  }

  // return new arrayl with modified cartItem
  return cartItems.map((cartItem) =>
    cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};



//
// Action creators
//

export const setIsCartOpen = (isCartOpen) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen);

export const addItemToCart = (cartItems, productToAdd) => createAction(
  CART_ACTION_TYPES.SET_CART_ITEMS,
  addCartItem(cartItems, productToAdd)
);

export const removeItemFromCart = (cartItems, cartItemToRemove) => createAction(
  CART_ACTION_TYPES.SET_CART_ITEMS,
  removeCartItem(cartItems, cartItemToRemove)
);

export const clearItemFromCart = (cartItems, cartItemToClear) => createAction(
  CART_ACTION_TYPES.SET_CART_ITEMS,
  clearCartItem(cartItems, cartItemToClear)
);