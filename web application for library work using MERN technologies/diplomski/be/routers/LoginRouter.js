const router = require("express").Router();
const { loginClient } = require("../controllers/loginController");

router.post("/login", loginClient);

module.exports = router;
