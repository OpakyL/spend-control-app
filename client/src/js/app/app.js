import React from "react";
import { useSelector } from "react-redux";
import { useRoutes } from "../hooks/routes-hook";
import Header from "./header";
import LogButton from "./log-button";
import Menu from "./menu";

const App = () => {
    const isLogged = useSelector((state) => state.auth.isLogged);

    return (
        <div className="container">
            <Menu />
            <Header />
            {useRoutes(isLogged)}
            <LogButton />
        </div>
    );
};

export default App;
