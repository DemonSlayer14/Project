const express = require("express");
const handler = require("../controller/myHandler");
const router = express.Router();

router.post("/users", handler.userSignup);
router.post("/users/login", handler.userLogin);
router.post("/coaches", handler.coachSignup);
router.post("/coaches/login", handler.coachLogin);
router.get("/coaches/all", handler.getAllCoaches);
router.get("/coaches/:coachId", handler.getCoachById);
router.get("/users/:userId", handler.getUserById);
router.post("/users/booking/:userId/:coachId", handler.booking);
router.put("/booking/:bookingId", handler.updateBooking);
router.delete("/booking/:bookingId", handler.deleteBooking);
router.get("/coaches/booking/:coachId", handler.coachAppointments);
router.get("/users/booking/:userId", handler.userAppointments);
router.all("*", handler.invalid);

module.exports = router;
