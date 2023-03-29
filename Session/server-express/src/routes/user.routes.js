const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user.ctrl");

router.post("/login", userCtrl.login);
router.get("/logout", userCtrl.logout);
router.get("/validate", userCtrl.validate);

module.exports = router;
