import React from "react";

const Burger = ({ onClick, active }) => {
    return (
        <div className="ham">
            <input
                type="checkbox"
                id="checkbox4"
                className="checkbox4 visuallyHidden"
                checked={!active}
                readOnly={true}
            />
            <label htmlFor="checkbox4">
                <div className="hamburger hamburger4" onClick={onClick}>
                    <span className="bar bar1"></span>
                    <span className="bar bar2"></span>
                    <span className="bar bar3"></span>
                    <span className="bar bar4"></span>
                    <span className="bar bar5"></span>
                </div>
            </label>
        </div>
    );
};

export default Burger;
