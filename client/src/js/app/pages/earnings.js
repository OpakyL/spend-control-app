import React, { useState } from "react";
import MoneyForm from "../money-form/";
import { useSelector } from "react-redux";
import { useData } from "../../hooks/data-hook";

const Earnings = () => {
    const { removeEarning, addEarning, updateEarning } = useData();
    const userId = useSelector((state) => state.auth.userId);
    const table = useSelector((state) => state.data.earnings);
    const initData = {
        userId,
        money: "",
        reason: "",
        updatingEarningId: "",
    };
    const [data, setData] = useState(initData);

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const addHandler = () => {
        addEarning(data);
        setData(initData);
    };

    const onUpdate = (id) => {
        const row = table.find((el) => el._id === id);
        setData({
            ...data,
            money: row.money,
            reason: row.reason,
            updatingEarningId: id,
        });
    };

    const updateHandler = () => {
        updateEarning(data);
        setData(initData);
    };

    const removeHandler = (e) => {
        removeEarning(data.userId, e.target.id);
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

export default Earnings;
