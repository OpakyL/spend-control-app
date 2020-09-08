import React from "react";
import { useRoutes } from "../hooks/routes-hook";
import Header from "./header";

const App = () => {
    return (
        <div className="container">
            <Header />
            {useRoutes()}
        </div>
    );
};

export default App;
