import React from "react";
import { NavLink as Link } from "react-router-dom";

const LogButton = () => {
    return (
        <div className="header">
            <Link className="header__link" to="/logoff">
                <img src="/assets/img/icons/log-in.svg" />
            </Link>
        </div>
    );
};

export default LogButton;
