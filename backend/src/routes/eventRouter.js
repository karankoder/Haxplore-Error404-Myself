import express from "express";
import {
	createEvent,
	getEvent,
	getEvents,
	updateEvent,
} from "../controllers/eventController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { getSlots } from "../controllers/slotController.js";

const eventRouter = express.Router();

eventRouter.route("/").get(getEvents).post(isAuthenticated, createEvent);
eventRouter.route("/slots").post(getSlots);
eventRouter.route("/:id").get(getEvent).patch(isAuthenticated, updateEvent);

export default eventRouter;