import React, { useState } from 'react';
import Cart from './components/Cart/Cart';

import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import CartProvider from './store/CartProvider';

function App() {
  const [cartShown, setCartShown] = useState(false);

  const showCardHandler = () => {
    setCartShown(true);
  };

  const removeCardHandler = () => {
    setCartShown(false);
  };

  return (
    <CartProvider>
      {cartShown && <Cart onRemove={removeCardHandler} />}
      <Header onShow={showCardHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
