import React, { useState } from "react";

import "./App.css";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartShown, setCartShown] = useState(false);

  const cartShownHandler = () => {
    setCartShown(true);
  };

  const cartHideHandler = () => {
    setCartShown(false);
  };

  return (
    <CartProvider>
      {cartShown && <Cart onCloseCart={cartHideHandler} />}
      <Header onShowCart={cartShownHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
