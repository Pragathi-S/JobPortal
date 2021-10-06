const jwt = require('jsonwebtoken');
const Recruiter = require('../models/Recruiter');
const Candidate = require('../models/Candidate');
const ErrorResponse = require('../utils/errorResponse');

exports.protectRecruiter = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
    }

    if (!token) {
        return next(new ErrorResponse("Not authorized to access this route", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const recruiter = await Recruiter.findById(decoded.id);

        if (!recruiter) {
            return next(new ErrorResponse("No recruiter found with this id", 404));
        }

        req.recruiter = recruiter;

        next();
    } catch (error) {
        return next(new ErrorResponse("Not authorized to access this route", 401));
    }

};

exports.protectCandidate = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
    }

    if (!token) {
        return next(new ErrorResponse("Not authorized to access this route", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const candidate = await Candidate.findById(decoded.id);

        if (!candidate) {
            return next(new ErrorResponse("No candidate found with this id", 404));
        }

        req.candidate = candidate;

        next();
    } catch (error) {
        return next(new ErrorResponse("Not authorized to access this route", 401));
    }

};