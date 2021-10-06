const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const ApplicantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide applicant's name"]
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email"
        ]
    },
    resume: {
        type: String,
        required: [true, "Please provide the resume link"],
        match: [
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            "Please provide a valid link"
        ]
    }
});

ApplicantSchema.methods.getSignedToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};

const Applicant = mongoose.model("Applicant", ApplicantSchema);

module.exports = Applicant;