const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const RecruiterSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"]
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email"
        ]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 6,
        select: false
    }
});

RecruiterSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

RecruiterSchema.methods.matchPasswords = async function (password) {
    return await bcrypt.compare(password, this.password);
};

RecruiterSchema.methods.getSignedToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};

const Recruiter = mongoose.model("Recruiter", RecruiterSchema);

module.exports = Recruiter;