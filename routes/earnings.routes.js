const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const moment = require("moment");
const User = require("../models/User");
const Money = require("../models/Money");
const router = Router();

// /api/earnings/add
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

            const earning = new Money({ money, reason, date });

            user.earnings.push(earning);

            await user.save();

            res.status(201).json(earning);
        } catch (e) {
            res.status(500).json({ message: "Ошибка! Попробуйте еще раз" });
        }
    }
);

// /api/earnings/update
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
            "updatingEarningId",
            "Вы должны предоставить идентификатор прибыли"
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

            const { userId, money, reason, updatingEarningId } = req.body;

            const user = await User.findById(userId);
            if (!user) {
                return res.status(400).json({
                    message: "Отправлен неавторизированный запрос",
                });
            }

            user.earnings.find(
                (el) => el._id == updatingEarningId
            ).money = money;

            user.earnings.find(
                (el) => el._id == updatingEarningId
            ).reason = reason;

            user.markModified("earnings");
            await user.save();

            res.status(201).json(
                user.earnings.find((el) => el._id == updatingEarningId)
            );
        } catch (e) {
            res.status(500).json({ message: "Ошибка! Попробуйте еще раз" });
        }
    }
);

// /api/earnings/get
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

            res.json(user.earnings);
        } catch (e) {
            res.status(500).json({ message: "Ошибка! Попробуйте еще раз" });
        }
    }
);

// /api/earnings/remove
router.delete(
    "/remove",
    [
        check(
            "userId",
            "Вы должны предоставить идентификатор пользователя"
        ).exists(),
        check(
            "earningId",
            "Вы должны предоставить идентификатор прибыли"
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

            const { userId, earningId } = req.body;

            const user = await User.findById(userId);

            if (!user) {
                return res.status(400).json({
                    message: "Отправлен неавторизированный запрос",
                });
            }

            const withoutDeleted = user.earnings.filter(
                (el) => el._id != earningId
            );
            user.earnings = withoutDeleted;

            await user.save();

            res.status(201).json({ message: "Прибыль успешно удалена" });
        } catch (e) {
            res.status(500).json({ message: "Ошибка! Попробуйте еще раз" });
        }
    }
);

module.exports = router;
