import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "./assets/scss/main.scss";
import App from "./js/app";
import store from "./js/redux/store/store";

const Index = () => (
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);

ReactDOM.render(<Index />, document.getElementById("root"));
