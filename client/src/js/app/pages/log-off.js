import React from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../../hooks/auth-hook";

const LogOut = () => {
    const { logout } = useAuth();
    logout();

    return <Redirect to="/auth" />;
};

export default LogOut;
