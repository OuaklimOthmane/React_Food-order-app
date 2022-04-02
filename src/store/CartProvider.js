import React, { useReducer } from "react";
import CartContext from "./cart-context";

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    //* Add item (Update number of items) :
    // const updatedItems = state.items.concat(action.item);
    let updatedItems;
    if (state.items.some((item) => item.id === action.item.id)) {
      updatedItems = state.items.map((item) =>
        item.id === action.item.id
          ? { ...item, amount: item.amount + action.item.amount }
          : item
      );
    } else {
      updatedItems = [...state.items, action.item];
    }

    //* Update the total amount :
    const newTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    return {
      items: updatedItems,
      totalAmount: newTotalAmount,
    };
  }

  if (action.type === "REMOVE_ITEM") {
    //* Determine the index of the item which we want decrease its amount :
    const removeItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    //* Decrease the item's amount :
    let updatedItems;
    if (state.items[removeItemIndex].amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      state.items[removeItemIndex].amount -= 1;
      updatedItems = [...state.items];
    }

    //* Update the total amount :
    const newTotalAmount =
      state.totalAmount - state.items[removeItemIndex].price;

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
