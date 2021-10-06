const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a job title"]
    },
    experience: {
        type: String,
        required: [true, "Please provide the experience required"]
    },
    skills: {
        type: String,
        required: [true, "Please provide the skills required"]
    },
    recruiter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recruiter',
        required: true
    }
});

JobSchema.methods.getSignedToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};

const Job = mongoose.model("Job", JobSchema);

module.exports = Job;