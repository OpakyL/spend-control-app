import React from "react";
import { NavLink as Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="header">
            <Link className="header__link" to="/earnings">
                <img src="/assets/img/icons/earnings.svg" />
            </Link>
            <Link className="header__link" to="/expenses">
                <img src="/assets/img/icons/expenses.svg" />
            </Link>
            <Link className="header__link" to="/chart">
                <img src="/assets/img/icons/chart.svg" />
            </Link>
            <Link className="header__link" to="/">
                <img src="/assets/img/icons/about.svg" />
            </Link>
        </div>
    );
};

export default Header;
