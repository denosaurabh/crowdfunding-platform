import React from "react";

import "./button.styles.scss";

const Button = ({
  colorStyle,
  size,
  content,
  addClass,
  onClickHandler
}) => (
  <button
    className={`button --${colorStyle} --${size} ${addClass}`}
    onClick={onClickHandler}
  >
    {content}
  </button>
);

export default Button;
