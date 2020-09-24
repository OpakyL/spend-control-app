import React, { useState, useEffect } from "react";
import Input from "../../components/input";
import Button from "../../components/button/button";
import { useHttp } from "../../hooks/http-hook";
import { useAuth } from "../../hooks/auth-hook";

const Auth = () => {
    const { loading, error, request, clearError } = useHttp();
    const { login } = useAuth();
    const [form, setForm] = useState({
        nickname: "",
        password: "",
    });

    useEffect(() => {
        //!Допилить
        if (error) {
            alert(error);
            clearError();
        }
    }, [error, clearError]);

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const fetchUser = async () => {
        const data = await request("/api/auth/login", "POST", {
            ...form,
        });
        login(data);
    };

    const loginHandler = async () => {
        try {
            fetchUser();
        } catch (e) {}
    };

    const registerHandler = async () => {
        try {
            await request("/api/auth/register", "POST", {
                ...form,
            });
            fetchUser();
        } catch (e) {}
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div className="section auth">
            <form className="auth__form" onSubmit={handleSubmit}>
                <Input
                    className="input-auth"
                    id="nickname"
                    name="nickname"
                    placeholder="Никнейм"
                    onChange={changeHandler}
                />
                <Input
                    className="input-auth"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Пароль"
                    onChange={changeHandler}
                    disabled={loading}
                />
                <Button
                    className="button-auth"
                    id="login"
                    name="login"
                    type="submit"
                    onClick={loginHandler}
                    disabled={loading}
                >
                    Войти
                </Button>
                <Button
                    className="button-auth"
                    id="register"
                    name="register"
                    type="submit"
                    onClick={registerHandler}
                    disabled={loading}
                >
                    Зарегистрироваться
                </Button>
            </form>
        </div>
    );
};

export default Auth;
