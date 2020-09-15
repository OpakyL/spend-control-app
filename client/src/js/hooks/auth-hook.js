import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn, resetState } from "../redux/actions/actions";

const storageName = "userData";

export const useAuth = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));

        if (data && data.token) {
            const { userId, token } = data;
            dispatch(userLoggedIn({ userId, token }));
        }
    }, [login]);

    const login = useCallback((data) => {
        const { token, userId } = data;

        dispatch(userLoggedIn({ userId, token }));
        localStorage.setItem(storageName, JSON.stringify({ userId, token }));
    }, []);

    const logout = useCallback(() => {
        dispatch(resetState());
        localStorage.removeItem(storageName);
    }, []);

    return { login, logout };
};
