import React, { useReducer } from "react";
import CartContext from "./cart-context";

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    //* Add item (Update number of items) :
    const updatedItems = state.items.concat(action.item);
    //* Update the total amount :
    const newTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    return {
      items: updatedItems,
      totalAmount: newTotalAmount,
    };
  }

  return defaultCart;
};

const defaultCart = {
  items: [],
  totalAmount: 0,
};

const CartProvider = (props) => {
  const [cartState, dispatchCartState] = useReducer(cartReducer, defaultCart);

  const addItemToCartHandler = (item) => {
    dispatchCartState({ type: "ADD_ITEM", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartState({ type: "REMOVE_ITEM", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
