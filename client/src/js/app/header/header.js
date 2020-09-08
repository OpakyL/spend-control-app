import React from "react";
import { NavLink as Link } from "react-router-dom";

const Header = () => {
    return (
        <div>
            <Link to="/earnings">Доход</Link>
            <Link to="/expenses">Траты</Link>
            <Link to="/chart">График</Link>
            <Link to="/" exact={true}>
                О проекте
            </Link>
            <Link to="/auth">Авторизация</Link>
        </div>
    );
};

export default Header;
