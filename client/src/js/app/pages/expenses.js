import React, { useState } from "react";
import MoneyForm from "../money-form/";
import { useSelector } from "react-redux";
import { useData } from "../../hooks/data-hook";

const Expenses = () => {
    const { removeExpense, addExpense, updateExpense } = useData();
    const userId = useSelector((state) => state.auth.userId);
    const table = useSelector((state) => state.data.expenses);
    const initData = {
        userId,
        money: "",
        reason: "",
        updatingExpenseId: "",
    };
    const [data, setData] = useState(initData);

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const addHandler = () => {
        addExpense(data);
        setData(initData);
    };

    const onUpdate = (id) => {
        const row = table.find((el) => el._id === id);
        setData({
            ...data,
            money: row.money,
            reason: row.reason,
            updatingExpenseId: id,
        });
    };

    const updateHandler = () => {
        updateExpense(data);
        setData(initData);
    };

    const removeHandler = (e) => {
        removeExpense(data.userId, e.target.id);
    };

    return (
        <div className="section earnings">
            {table && (
                <MoneyForm
                    changeHandler={changeHandler}
                    addHandler={addHandler}
                    removeHandler={removeHandler}
                    onUpdate={onUpdate}
                    updateHandler={updateHandler}
                    table={table}
                    data={data}
                />
            )}
        </div>
    );
};

export default Expenses;
