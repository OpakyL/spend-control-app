import React, { useState } from "react";
import { NavLink as Link } from "react-router-dom";
import Burger from "./burger";
import cn from "classnames";

const Menu = () => {
    const [closed, setClosed] = useState(true);
    const menuClasses = cn("menu", { menu_closed: closed });

    const toggleMenu = () => {
        setClosed((c) => !c);
    };

    return (
        <>
            <Burger onClick={toggleMenu} active={closed} />

            <div className={menuClasses}>
                <div className="menu__wrapper">
                    <div className="menu__link" onClick={toggleMenu}>
                        <Link to="/earnings">Доход</Link>
                    </div>
                    <div className="menu__link" onClick={toggleMenu}>
                        <Link to="/expenses">Траты</Link>
                    </div>
                    <div className="menu__link" onClick={toggleMenu}>
                        <Link to="/chart">График</Link>
                    </div>
                    <div className="menu__link" onClick={toggleMenu}>
                        <Link to="/">О проекте</Link>
                    </div>
                    <div className="menu__link" onClick={toggleMenu}>
                        <Link to="/auth">Войти</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Menu;
