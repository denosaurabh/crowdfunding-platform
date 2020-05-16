import React from "react";

import "./button.styles.scss";

const Button = ({
  colorStyle,
  size,
  content,
  addClass,
  onClickHandler,
  display
}) => (
  <button
    className={`button --${colorStyle} --${size} ${addClass} --${display}`}
    onClick={onClickHandler}
  >
    {content}
  </button>
);

export default Button;
