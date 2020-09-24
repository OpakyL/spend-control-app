const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = Router();

// /api/auth/register
router.post(
    "/register",
    [
        check(
            "nickname",
            "Имя пользователя не может быть короче 1 символа"
        ).isLength({ min: 1 }),
        check(
            "password",
            "Длина пароля не может быть короче 3 символов"
        ).isLength({ min: 3 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Некорректные данные при регистрации",
                });
            }

            const { nickname, password } = req.body;

            const candidate = await User.findOne({ nickname });

            if (candidate) {
                return res.status(400).json({
                    message: "Пользователь с таким именем уже существует",
                });
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({
                nickname,
                password: hashedPassword,
            });

            await user.save();

            res.status(201).json({ message: "Пользователь создан" });
        } catch (e) {
            res.status(500).json({ message: "Ошибка! Попробуйте еще раз" });
        }
    }
);

// /api/auth/login
router.post(
    "/login",
    [
        check("nickname", "Введите имя пользователя").exists(),
        check("password", "Введите пароль").exists(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Некорректные данные при входе в систему",
                });
            }
            const { nickname, password } = req.body;

            const user = await User.findOne({ nickname });

            if (!user) {
                return res
                    .status(400)
                    .json({ message: "Пользователь не найден" });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res
                    .status(400)
                    .json({ message: "Неверный пароль, попробуйте снова" });
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get("jwtSecret"),
                { expiresIn: "1h" }
            );

            res.json({ token, userId: user.id });
        } catch (e) {
            res.status(500).json({ message: "Ошибка! Попробуйте еще раз" });
        }
    }
);

module.exports = router;
