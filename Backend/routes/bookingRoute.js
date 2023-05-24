const express = require("express");
const isAuthenticated = require("../middleware/validate");
const bookingController = require("../controller/bookingController");

const router = express.Router();
router.route("/").get(isAuthenticated,bookingController.getBooking);

router.route("/:id").post(isAuthenticated,bookingController.createBooking);


module.exports = router;

//aa su 6 hire us design joto hto
//ketla samosa 8 samosa che and ola ajay nu samosa pav am e k che total 9?
//ha okk 