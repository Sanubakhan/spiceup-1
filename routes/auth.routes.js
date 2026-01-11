const express = require("express");
const router = express.Router();
const authcontrollers = require("../controllers/auth.controllers");

router.post("/register", authcontrollers.userRegister);
router.post("/login", authcontrollers.userLogin);
router.get("/logout", authcontrollers.userLogout);

router.post("/partner/register", authcontrollers.partnerregister);
router.post("/partner/login", authcontrollers.partnerlogin);
router.get("/partner/logout", authcontrollers.partnerlogout);
module.exports = router;