import { useDispatch } from "react-redux";
import { useHttp } from "./http-hook";
import {
    earningsFetched,
    earningAdded,
    earningUpdated,
    earningRemoved,
    expensesFetched,
    expenseAdded,
    expenseUpdated,
    expenseRemoved,
} from "../redux/actions/actions";

export const useData = () => {
    const { request } = useHttp();
    const dispatch = useDispatch();

    const fetchEarnings = async (userId) => {
        try {
            const earnings = await request("/api/earnings/get", "POST", {
                userId,
            });
            dispatch(earningsFetched(earnings));
        } catch (e) {}
    };

    const addEarning = async (data) => {
        try {
            const res = await request("/api/earnings/add", "POST", {
                ...data,
            });
            dispatch(earningAdded(res));
        } catch (e) {}
    };

    const updateEarning = async (data) => {
        try {
            const res = await request("/api/earnings/update", "PUT", {
                ...data,
            });
            dispatch(earningUpdated(res));
        } catch (e) {}
    };

    const removeEarning = async (userId, earningId) => {
        try {
            await request("/api/earnings/remove", "DELETE", {
                userId,
                earningId,
            });
            dispatch(earningRemoved(earningId));
        } catch (e) {}
    };

    const fetchExpenses = async (userId) => {
        try {
            const expenses = await request("/api/expenses/get", "POST", {
                userId,
            });
            dispatch(expensesFetched(expenses));
        } catch (e) {}
    };

    const addExpense = async (data) => {
        try {
            const res = await request("/api/expenses/add", "POST", {
                ...data,
            });
            dispatch(expenseAdded(res));
        } catch (e) {}
    };

    const updateExpense = async (data) => {
        try {
            const res = await request("/api/expenses/update", "PUT", {
                ...data,
            });
            dispatch(expenseUpdated(res));
        } catch (e) {}
    };

    const removeExpense = async (userId, expenseId) => {
        try {
            await request("/api/expenses/remove", "DELETE", {
                userId,
                expenseId,
            });
            dispatch(expenseRemoved(expenseId));
        } catch (e) {}
    };

    return {
        fetchEarnings,
        removeEarning,
        addEarning,
        updateEarning,
        fetchExpenses,
        addExpense,
        updateExpense,
        removeExpense,
    };
};
