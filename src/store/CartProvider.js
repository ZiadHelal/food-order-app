import { useReducer } from 'react';

import CartContext from './cart-context';

const initialCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action === 'ADD_ITEM') {
    const updatedItems = state.items.concat(action.value);
    const updatedTotalAmount =
      state.totalAmount + action.value.price * action.value.amount;
    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }
  if (action === 'DEL_ITEM') {
  }
  return initialCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    initialCartState
  );

  const addItemCartHandler = (item) => {
    dispatchCartAction({ type: 'ADD_ITEM', value: item });
  };

  const removeItemCartHandler = (item) => {
    dispatchCartAction({ type: 'DEL_ITEM', value: item });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemCartHandler,
    removeItem: removeItemCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
