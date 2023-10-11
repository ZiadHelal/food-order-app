import { useRef } from 'react';

import classes from './Checkout.module.css';

const Checkout = (props) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confrimHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredstreet = streetInputRef.current.value;
    const enteredpostal = postalInputRef.current.value;
    const enteredcity = cityInputRef.current.value;
  };

  return (
    <form className={classes.form} onSubmit={confrimHandler}>
      <div className={classes.control}>
        <label htmlFor='name'>Your Name</label>
        <input id='name' type='text' ref={nameInputRef}></input>
      </div>
      <div className={classes.control}>
        <label htmlFor='street'>Street</label>
        <input id='street' type='text' ref={streetInputRef}></input>
      </div>
      <div className={classes.control}>
        <label htmlFor='postal'>Postal Code</label>
        <input id='postal' type='text' ref={postalInputRef}></input>
      </div>
      <div className={classes.control}>
        <label htmlFor='city'>City</label>
        <input id='city' type='text' ref={cityInputRef}></input>
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
