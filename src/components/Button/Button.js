import React from "react";

const Button = (props) => {
  let classNames = props.className ? `${props.className}` : `btn btn-primary`;

  const handleClick = (event) => {
    props.onClick(event);
  };
  return (
    <button
      className={classNames}
      onClick={handleClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
