import React from "react";
import { NavLink } from "react-router-dom";
import cn from "classnames";

import "./button.scss";

const Button = ({
    className = "",
    href = "",
    outside = false,
    disabled = false,
    children = "Button",
    ...attrs
}) => {
    const classes = cn("button", className, disabled);

    if (href) {
        if (outside) {
            return (
                <a href={href} className={classes} {...attrs} target="_blank">
                    {children}
                </a>
            );
        }
        return (
            <NavLink to={href} className={classes} {...attrs}>
                {children}
            </NavLink>
        );
    }
    return (
        <button className={classes} {...attrs}>
            {children}
        </button>
    );
};

export default Button;
