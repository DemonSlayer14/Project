const model = require("../models/dbSchemas");
const validator = require("../utilities/validation");
const generate = require("..//utilities/generateId");
const e = require("express");

exports.userSignup = async (req, res) => {
    try {
        if (
            validator.name(req.body.name) &&
            validator.password(req.body.password) &&
            validator.age(req.body.dateOfBirth) &&
            validator.gender(req.body.gender) &&
            validator.mobileNumber(req.body.mobileNumber) &&
            validator.email(req.body.email) &&
            validator.pincode(req.body.pincode) &&
            validator.city(req.body.city) &&
            validator.state(req.body.state) &&
            validator.country(req.body.country)
        ) {
            let user = await model.users.find({ email: req.body.email });
            if (user.length != 0) {
                res.status(400).json({
                    message: `User exists with this email id`,
                });
            } else {
                let newUser = req.body;
                newUser.userId = await generate.userId();
                await model.users.create(newUser);
                res.status(201).json({
                    message: `${newUser.userId}`,
                });
            }
        }
    } catch (err) {
        if (err.status)
            res.status(err.status).json({
                message: err.message,
            });
        else
            res.status(502).json({
                message: err.message,
            });
    }
};

exports.userLogin = async (req, res) => {
    try {
        let user = await model.users.findOne({
            userId: req.body.userId,
            password: req.body.password,
        });
        if (user != null) {
            res.status(200).send(`true`);
        } else {
            res.status(400).json({
                message: `Incorrect user id or password`,
            });
        }
    } catch (err) {
        res.status(502).json({
            message: err.message,
        });
    }
};

exports.coachSignup = async (req, res) => {
    try {
        if (
            validator.name(req.body.name) &&
            validator.password(req.body.password) &&
            validator.gender(req.body.gender) &&
            validator.age(req.body.dateOfBirth) &&
            validator.mobileNumber(req.body.mobileNumber) &&
            validator.speciality(req.body.speciality)
        ) {
            let coach = await model.coaches.find({ name: req.body.name });
            if (coach.length != 0) {
                res.status(400).json({
                    message: `Coach exists with this name`,
                });
            } else {
                let newCoach = req.body;
                newCoach.coachId = await generate.coachId();
                await model.coaches.create(newCoach);
                res.status(201).json({
                    message: `${newCoach.coachId}`,
                });
            }
        }
    } catch (err) {
        if (err.status)
            res.status(err.status).json({
                message: err.message,
            });
        else
            res.status(502).json({
                message: err.message,
            });
    }
};

exports.coachLogin = async (req, res) => {
    try {
        let coach = await model.coaches.findOne({
            coachId: req.body.coachId,
            password: req.body.password,
        });
        if (coach != null) {
            res.status(200).send(`true`);
        } else {
            res.status(400).json({
                message: `Incorrect coach Id or password`,
            });
        }
    } catch (err) {
        res.status(502).json({
            message: err.message,
        });
    }
};

exports.getAllCoaches = async (req, res) => {
    try {
        let coaches = await model.coaches.find({}, { _id: 0, __v: 0 });
        if (coaches.length != 0) {
            res.status(200).send(coaches);
        } else {
            res.status(400).json({
                message: `No coach info in database`,
            });
        }
    } catch (err) {
        res.status(502).json({
            message: err.message,
        });
    }
};

exports.getCoachById = async (req, res) => {
    try {
        let coach = await model.coaches.findOne(
            { coachId: req.params.coachId },
            { _id: 0, __v: 0 }
        );
        if (coach != null) {
            res.status(200).send(coach);
        } else {
            res.status(400).json({
                message: `Coach Id does not exist`,
            });
        }
    } catch (err) {
        res.status(502).json({
            message: err.message,
        });
    }
};

exports.getUserById = async (req, res) => {
    try {
        let user = await model.users.findOne(
            { userId: req.params.userId },
            { _id: 0, __v: 0 }
        );
        if (user != null) {
            res.status(200).send(user);
        } else {
            res.status(400).json({
                message: `User Id does not exist`,
            });
        }
    } catch (err) {
        res.status(502).json({
            message: err.message,
        });
    }
};

exports.booking = async (req, res) => {
    try {
        let user = await model.users.findOne({ userId: req.params.userId });
        if (user != null) {
            let coach = await model.coaches.findOne({
                coachId: req.params.coachId,
            });
            if (coach != null) {
                if (
                    validator.slot(req.body.slot) &&
                    validator.appointmentDate(req.body.dateOfAppointment) &&
                    (await validator.slotAvailability(
                        user.userId,
                        coach.coachId,
                        req
                    ))
                ) {
                    let newBooking = {
                        bookingId: await generate.bookingId(),
                        userId: req.params.userId,
                        coachId: req.params.coachId,
                        appointmentDate: req.body.dateOfAppointment,
                        slot: req.body.slot,
                    };
                    await model.bookings.create(newBooking);
                    res.status(200).send(true);
                }
            } else {
                res.status(400).json({
                    message: `Coach Id does not exist`,
                });
            }
        } else {
            res.status(400).json({
                message: `User Id does not exist`,
            });
        }
    } catch (err) {
        if (err.status)
            res.status(err.status).json({
                message: err.message,
            });
        else
            res.status(502).json({
                message: err.message,
            });
    }
};

exports.updateBooking = async (req, res) => {
    try {
        let booking = await model.bookings.findOne({
            bookingId: req.params.bookingId,
        });
        if (booking != null) {
            if (
                validator.slot(req.body.slot) &&
                validator.appointmentDate(req.body.dateOfAppointment) &&
                (await validator.slotAvailability(
                    booking.userId,
                    booking.coachId,
                    req
                ))
            ) {
                let newBooking = await model.bookings.findOneAndUpdate(
                    { bookingId: req.params.bookingId },
                    {
                        slot: req.body.slot,
                        appointmentDate: req.body.dateOfAppointment,
                    },
                    { new: true, runValidator: true }
                );
                res.status(200).send(true);
            }
        } else {
            res.status(400).json({
                message: `Booking Id does not exist`,
            });
        }
    } catch (err) {
        if (err.status) {
            res.status(err.status).json({
                message: err.message,
            });
        } else {
            res.status(502).json({
                message: err.message,
            });
        }
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        let del = await model.bookings.deleteOne({
            bookingId: req.params.bookingId,
        });
        if (del.deletedCount != 0) {
            res.status(200).send(`true`);
        } else {
            res.status(400).json({
                message: `Could not delete this appointment`,
            });
        }
    } catch (err) {
        res.status(502).json({
            message: err.message,
        });
    }
};

exports.coachAppointments = async (req, res) => {
    try {
        let booking = await model.bookings.find(
            { coachId: req.params.coachId },
            { _id: 0, __v: 0 }
        );
        if (booking.length != 0) {
            res.status(200).send(booking);
        } else {
            res.status(400).json({
                message: `Could not find any bookings`,
            });
        }
    } catch (err) {
        res.status(502).json({
            message: err.message,
        });
    }
};

exports.userAppointments = async (req, res) => {
    try {
        let booking = await model.bookings.find(
            { userId: req.params.userId },
            { _id: 0, __v: 0 }
        );
        if (booking.length != 0) {
            res.status(200).send(booking);
        } else {
            res.status(400).json({
                message: `Could not find any bookings`,
            });
        }
    } catch (err) {
        res.status(502).json({
            message: err.message,
        });
    }
};

exports.invalid = async (req, res) => {
    res.status(404).json({
        message: "Invalid path",
    });
};
