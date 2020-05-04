import React from "react";

import "./fieldinput.styles.scss";

const FieldInput = ({
  type,
  onChangeHandler,
  placeHolder,
  value,
  anotherClass,
  ...otherProps
}) => (
  <input
    className={`input ${anotherClass ? anotherClass : ""}`}
    type={type}
    onChange={onChangeHandler}
    placeholder={placeHolder}
    value={value}
    {...otherProps}
  />
);

export default FieldInput;
