import React, { useEffect, useState } from "react";
import Button from "../../components/button/";
import Input from "../../components/input/";

const MoneyForm = ({
    changeHandler,
    addHandler,
    removeHandler,
    onUpdate,
    updateHandler,
    table,
    data,
}) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [filter, setFilter] = useState("day");
    const [filteredTable, setFilteredTable] = useState(table);

    useEffect(() => {
        console.log(filter);
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear().toString();
        switch (filter) {
            case "day":
                setFilteredTable(
                    table.filter((el) => el.date === `${dd}.${mm}.${yyyy}`)
                );
                break;
            case "month":
                setFilteredTable(
                    table.filter(
                        (el) =>
                            el.date.split(".")[1] === mm &&
                            el.date.split(".")[2] === yyyy
                    )
                );
                break;
            case "year":
                setFilteredTable(
                    table.filter((el) => el.date.split(".")[2] === yyyy)
                );
                break;
            default:
                setFilteredTable(table);
                break;
        }
    }, [filter]);

    const onFilterChange = (e) => {
        setFilter(e.target.id);
    };

    const onUpdateHandlerClick = () => {
        setIsUpdating(false);
        updateHandler();
    };

    const onUpdateClick = (e) => {
        setIsUpdating(true);
        onUpdate(e.target.id);
    };

    return (
        <div className="money-form">
            <div className="money-form__buttons">
                <Button
                    id="day"
                    className="button-money"
                    onClick={onFilterChange}
                >
                    Сегодня
                </Button>
                <Button
                    id="month"
                    className="button-money"
                    onClick={onFilterChange}
                >
                    Месяц
                </Button>
                <Button
                    id="year"
                    className="button-money"
                    onClick={onFilterChange}
                >
                    Год
                </Button>
                <Button
                    id="entire"
                    className="button-money"
                    onClick={onFilterChange}
                >
                    Всё время
                </Button>
            </div>
            <div className="money-form__inputs">
                <Input
                    className="input-money input-large"
                    type="text"
                    id="money"
                    name="money"
                    placeholder="Деньги"
                    value={data.money}
                    onChange={changeHandler}
                />
                <Input
                    className="input-money input-large"
                    type="text"
                    id="reason"
                    name="reason"
                    placeholder="Причина"
                    value={data.reason}
                    onChange={changeHandler}
                />
                {(isUpdating && (
                    <Button
                        className="button-money button-large"
                        onClick={onUpdateHandlerClick}
                    >
                        Редактировать
                    </Button>
                )) || (
                    <Button
                        className="button-money button-large"
                        onClick={addHandler}
                    >
                        Добавить
                    </Button>
                )}
            </div>
            <table className="money-form__table">
                <thead>
                    <tr>
                        <th>Деньги</th>
                        <th>Причина</th>
                        <th>Удалить / Редактировать</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTable.map((el) => (
                        <tr key={el._id}>
                            <td>{el.money}</td>
                            <td>{el.reason}</td>
                            <td>
                                <Button id={el._id} onClick={removeHandler}>
                                    Удалить
                                </Button>
                                <Button id={el._id} onClick={onUpdateClick}>
                                    Редактировать
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MoneyForm;
