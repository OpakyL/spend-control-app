const { Router } = require("express");
const moment = require("moment");
const router = Router();

// /api/time
router.get("", [], async (req, res) => {
    const now = moment();
    const endOfDay = moment().endOf("day");
    const duration = moment.duration(endOfDay.diff(now));
    res.send({
        date: moment().format("YYYY-MM-DD"),
        time: moment.utc(duration.as("milliseconds")).format("HH:mm:ss"),
    });
});

module.exports = router;
