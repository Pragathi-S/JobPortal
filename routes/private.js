const express = require("express");
const router = express.Router();
const { getPrivateData, getPostedJobData, getJobData } = require('../controllers/private');
const { protectRecruiter, protectCandidate } = require('../middleware/auth');

router.route("/recruiterhome").get(protectRecruiter, getPrivateData);
router.route("/postedjobs").get(protectRecruiter, getPostedJobData);
router.route("/applicants").get(protectRecruiter, getPrivateData);
router.route("/newjob").get(protectRecruiter, getPrivateData);
router.route("/candidatehome").get(protectCandidate, getPrivateData);
router.route("/apply").get(protectCandidate, getJobData);



module.exports = router;