import { useContext, useEffect, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout';
import CartContext from '../../store/cart-context';

import classes from './Cart.module.css';

const Cart = (props) => {
  const [checkOut, setCheckOut] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        props.onRemove();
      }
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  });

  const orderHandler = () => {
    setCheckOut(true);
  };

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onRemove}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal onRemove={props.onRemove}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {checkOut && <Checkout onCancel={props.onRemove} />}
      {!checkOut && modalActions}
    </Modal>
  );
};

export default Cart;
