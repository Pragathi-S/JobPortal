const express = require("express");
const router = express.Router();

const {
    recruiterRegister,
    recruiterLogin,
    candidateRegister,
    candidateLogin
} = require("../controllers/auth");

router.route("/recruiterregister").post(recruiterRegister);

router.route("/recruiterlogin").post(recruiterLogin);

router.route("/candidateregister").post(candidateRegister);

router.route("/candidatelogin").post(candidateLogin);

module.exports = router;