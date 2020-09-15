import React from "react";
import { useAuth } from "../hooks/auth-hook";
import { useRoutes } from "../hooks/routes-hook";
import Header from "./header";
import LogButton from "./log-button";
import Menu from "./menu";

const App = () => {
    const { token, login, logout, userId } = useAuth();

    return (
        <div className="container">
            <Menu />
            <Header />
            {useRoutes(false)}
            <LogButton />
        </div>
    );
};

export default App;
