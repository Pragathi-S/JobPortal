const Recruiter = require('../models/Recruiter');
const Candidate = require('../models/Candidate');
const ErrorResponse = require('../utils/errorResponse');

exports.recruiterRegister = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const recruiter = await Recruiter.create({
            username, email, password
        });

        sendRecruiterToken(recruiter, 201, res);

    } catch (error) {
        next();
    }
};

exports.recruiterLogin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorResponse("Please provide both email and password", 400));
    }

    try {
        const recruiter = await Recruiter.findOne({ email }).select("+password");

        if (!recruiter) {
            return next(new ErrorResponse("Invalid Credentials", 401));
        }

        const isMatch = await recruiter.matchPasswords(password);

        if (!isMatch) {
            return next(new ErrorResponse("Invalid Credentials", 401));
        }

        sendRecruiterToken(recruiter, 200, res);

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.candidateRegister = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const candidate = await Candidate.create({
            username, email, password
        });

        sendCandidateToken(candidate, 201, res);

    } catch (error) {
        next();
    }
};

exports.candidateLogin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorResponse("Please provide both email and password", 400));
    }

    try {
        const candidate = await Candidate.findOne({ email }).select("+password");

        if (!candidate) {
            return next(new ErrorResponse("Invalid Credentials", 401));
        }

        const isMatch = await candidate.matchPasswords(password);

        if (!isMatch) {
            return next(new ErrorResponse("Invalid Credentials", 401));
        }

        sendCandidateToken(candidate, 200, res);

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const sendRecruiterToken = (recruiter, statusCode, res) => {
    const token = recruiter.getSignedToken();
    res.status(statusCode).json({ success: true, token });
};

const sendCandidateToken = (recruiter, statusCode, res) => {
    const token = recruiter.getSignedToken();
    res.status(statusCode).json({ success: true, token });
};
