import React from 'react';
import './arrow.css';

const Button = props => {
  return props.source ? (
    <button className="button" onClick={() => props.getNext(props.source)}>
      {props.children}
    </button>
  ) : (
    ''
  );
};

export default Button;
