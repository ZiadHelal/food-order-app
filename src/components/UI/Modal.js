import { Fragment } from 'react';
import { createPortal } from 'react-dom';

import classes from './Modal.module.css';

const Backdrop = () => {
  return <div className={classes.backdrop} />;
};

const Overlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  const overlayDocument = document.getElementById('overlays');

  return (
    <Fragment>
      {createPortal(<Backdrop />, overlayDocument)}
      {createPortal(<Overlay>{props.children}</Overlay>, overlayDocument)}
    </Fragment>
  );
};

export default Modal;
