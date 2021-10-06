const Job = require('../models/Job');
const Applicant = require('../models/Applicant');
const ErrorResponse = require('../utils/errorResponse');

exports.getPrivateData = (req, res, next) => {
    res.status(200).json({
        success: true,
        data: "You got access to the private data in this route"
    });
};

exports.getJobData = (req, res, next) => {
    Job.find()
        .then(result => {
            console.log('result: ', result)
            res.send(result.length > 0 ? result : 'No Jobs');
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getPostedJobData = (req, res, next) => {
    Job.find()
        .then(result => {
            console.log('result: ', result)
            res.send(result.length > 0 ? result : 'No Jobs');
        })
        .catch(err => {
            console.log(err);
        })

};

exports.postJobData = async (req, res, next) => {
    const { title, experience, skills } = req.body;


    if (!title || !experience || !skills) {
        return next(new ErrorResponse("Please provide all the details", 400));
    }

    try {
        const job = await Job.create({
            title, experience, skills, recruiter
            // recruiter
        });

        sendJobToken(job, 201, res);

    } catch (error) {
        next();
    }
};

exports.postApplicantData = async (req, res, next) => {
    const { name, email, resume } = req.body;

    if (!name || !email || !resume) {
        return next(new ErrorResponse("Please provide all the details", 400));
    }

    try {
        const applicant = await Applicant.create({
            name, email, resume
        });

        sendApplicantToken(applicant, 201, res);

    } catch (error) {
        next();
    }
};

const sendJobToken = (job, statusCode, res) => {
    const token = job.getSignedToken();
    res.status(statusCode).json({ success: true, token });
};

const sendApplicantToken = (applicant, statusCode, res) => {
    const token = applicant.getSignedToken();
    res.status(statusCode).json({ success: true, token });
};