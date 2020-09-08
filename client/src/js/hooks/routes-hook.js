import React from "react";
import { Redirect, Route, Switch } from "react-router";
import About from "../app/pages/about";
import Auth from "../app/pages/auth";
import Chart from "../app/pages/chart";
import Earnings from "../app/pages/earnings";
import Expenses from "../app/pages/expenses";

export const useRoutes = () => {
    return (
        <Switch>
            <Route path="/earnings">
                <Earnings />
            </Route>
            <Route path="/expenses">
                <Expenses />
            </Route>
            <Route path="/chart">
                <Chart />
            </Route>
            <Route path="/" exact={true}>
                <About />
            </Route>
            <Route path="/auth">
                <Auth />
            </Route>
            <Redirect to="/" />
        </Switch>
    );
};
