import React, { Fragment, useState } from 'react';
import Cart from './components/Cart/Cart';

import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';

function App() {
  const [cartShown, setCartShown] = useState(false);

  const showCardHandler = () => {
    setCartShown(true);
  };

  const removeCardHandler = () => {
    setCartShown(false);
  };

  return (
    <Fragment>
      {cartShown && <Cart onRemove={removeCardHandler} />}
      <Header onShow={showCardHandler} />
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
