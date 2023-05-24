// import express from "express";
// import {
//   createGig,
//   deleteGig,
//   getGig,
//   getGigs,
// } from "../controllers/gig.controller.js";
// import { verifyToken } from "../middleware/jwt.js";

// const router = express.Router();

// router.post("/", verifyToken, createGig);
// router.delete("/:id", verifyToken, deleteGig);
// router.get("/single/:id", getGig);
// router.get("/", getGigs);

const isAuthenticated = require("../middleware/validate")
// export default router;

const express = require("express");
const serviceController = require("../controller/serviceController")

const router = express.Router()

router.route("/").post(isAuthenticated, serviceController.createService)
router.delete("/:id", isAuthenticated, serviceController.deleteService);
// router.get("/getone/:id", serviceController.getService);

module.exports = router