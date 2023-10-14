import { useReducer } from 'react';

import CartContext from './cart-context';

const initialCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD_ITEM') {
    const updatedTotalAmount =
      state.totalAmount + action.value.price * action.value.amount;

    const itemIsExistIndex = state.items.findIndex(
      (item) => item.id === action.value.id
    );
    const existingCartItem = state.items[itemIsExistIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.value.amount,
      };
      updatedItems = [...state.items];
      updatedItems[itemIsExistIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.value);
    }

    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  if (action.type === 'DEL_ITEM') {
    const itemIsExistIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[itemIsExistIndex];
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;
    let updatedItems;

    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[itemIsExistIndex] = updatedItem;
    }
    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  if (action.type === 'EMPTY_CART') {
    return initialCartState;
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

  const removeItemCartHandler = (id) => {
    dispatchCartAction({ type: 'DEL_ITEM', id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: 'EMPTY_CART' });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemCartHandler,
    removeItem: removeItemCartHandler,
    clearCart: clearCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
