import React from "react";
import { useSelector } from "react-redux";
import { NavLink as Link } from "react-router-dom";
import { useAuth } from "../../hooks/auth-hook";

const LogButton = () => {
    const isLogged = useSelector((state) => state.auth.isLogged);

    const { logout } = useAuth();

    const onLogout = () => {
        logout();
    };

    let LogLink;

    if (isLogged) {
        LogLink = (
            <Link className="header__link" onClick={onLogout} to="/auth">
                <img src="/assets/img/icons/log-out.svg" />
            </Link>
        );
    } else {
        LogLink = (
            <Link className="header__link" to="/auth">
                <img src="/assets/img/icons/log-in.svg" />
            </Link>
        );
    }

    return <div className="header">{LogLink}</div>;
};

export default LogButton;
