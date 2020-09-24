const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const moment = require("moment");
const User = require("../models/User");
const Money = require("../models/Money");
const router = Router();

// /api/expenses/add
router.post(
    "/add",
    [
        check("money", "Количество денег должно быть числом").isNumeric(),
        check("reason", "Введите причину").exists(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Введены некорректные данные",
                });
            }

            const { userId, money, reason } = req.body;

            const user = await User.findById(userId);

            if (!user) {
                return res.status(400).json({
                    message: "Отправлен неавторизированный запрос",
                });
            }

            const date = moment().format("DD.MM.YYYY");

            const expense = new Money({ money, reason, date });

            user.expenses.push(expense);

            await user.save();

            res.status(201).json(expense);
        } catch (e) {
            res.status(500).json({ message: "Ошибка! Попробуйте еще раз" });
        }
    }
);

// /api/expenses/update
router.put(
    "/update",
    [
        check("money", "Количество денег должно быть числом").isNumeric(),
        check("reason", "Введите причину").exists(),
        check(
            "userId",
            "Вы должны предоставить идентификатор пользователя"
        ).exists(),
        check(
            "updatingExpenseId",
            "Вы должны предоставить идентификатор убытка"
        ).exists(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Введены некорректные данные",
                });
            }

            const { userId, money, reason, updatingExpenseId } = req.body;

            const user = await User.findById(userId);
            if (!user) {
                return res.status(400).json({
                    message: "Отправлен неавторизированный запрос",
                });
            }

            user.expenses.find(
                (el) => el._id == updatingExpenseId
            ).money = money;

            user.expenses.find(
                (el) => el._id == updatingExpenseId
            ).reason = reason;

            user.markModified("expenses");
            await user.save();

            res.status(201).json(
                user.expenses.find((el) => el._id == updatingExpenseId)
            );
        } catch (e) {
            res.status(500).json({ message: "Ошибка! Попробуйте еще раз" });
        }
    }
);

// /api/expenses/get
router.post(
    "/get",
    [
        check(
            "userId",
            "Вы должны предоставить идентификатор пользователя"
        ).exists(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Введены некорректные данные",
                });
            }

            const { userId } = req.body;

            const user = await User.findById(userId);

            if (!user) {
                return res.status(400).json({
                    message: "Отправлен неавторизированный запрос",
                });
            }

            res.json(user.expenses);
        } catch (e) {
            res.status(500).json({ message: "Ошибка! Попробуйте еще раз" });
        }
    }
);

// /api/expenses/remove
router.delete(
    "/remove",
    [
        check(
            "userId",
            "Вы должны предоставить идентификатор пользователя"
        ).exists(),
        check(
            "expenseId",
            "Вы должны предоставить идентификатор убытка"
        ).exists(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Введены некорректные данные",
                });
            }

            const { userId, expenseId } = req.body;

            const user = await User.findById(userId);

            if (!user) {
                return res.status(400).json({
                    message: "Отправлен неавторизированный запрос",
                });
            }

            const withoutDeleted = user.expenses.filter(
                (el) => el._id != expenseId
            );
            user.expenses = withoutDeleted;

            await user.save();

            res.status(201).json({ message: "Прибыль успешно удалена" });
        } catch (e) {
            res.status(500).json({ message: "Ошибка! Попробуйте еще раз" });
        }
    }
);

module.exports = router;
