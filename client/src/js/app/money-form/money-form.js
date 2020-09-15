import React from "react";
import Button from "../../components/button/";
import Input from "../../components/input/";

const MoneyForm = () => {
    return (
        <div className="money-form">
            <div className="money-form__buttons">
                <Button className="button-money">Сегодня</Button>
                <Button className="button-money">Неделя</Button>
                <Button className="button-money">Месяц</Button>
                <Button className="button-money">Год</Button>
                <Button className="button-money">Всё время</Button>
            </div>
            <div className="money-form__inputs">
                <Input
                    className="input-money input-large"
                    placeholder="Деньги"
                />
                <Input
                    className="input-money input-large"
                    placeholder="Причина"
                />
                <Button className="button-money button-large">Добавить</Button>
            </div>
            <table className="money-form__table">
                <thead>
                    <tr>
                        <th>Деньги</th>
                        <th>Причина</th>
                        <th>УДРЕД</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1500</td>
                        <td>На еду</td>
                        <td>кнопка</td>
                    </tr>
                    <tr>
                        <td>2000</td>
                        <td>Оплата проездного</td>
                        <td>кнопка</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default MoneyForm;
