import React from "react";
import cn from "classnames";

import "./input.scss";

const Input = ({ className = "", disabled = false, ...attrs }) => {
    const classes = cn("input", className, disabled);
    return <input className={classes} {...attrs} />;
};

export default Input;
