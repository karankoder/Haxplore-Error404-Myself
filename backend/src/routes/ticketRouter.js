import express from "express";
import {
	cancelTicket,
	bookTickets,
	paymentFailed,
	confirmTickets,
} from "../controllers/ticketController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const ticketRouter = express.Router();

ticketRouter.route("/book").post(isAuthenticated, bookTickets);
ticketRouter.route("/confirm").post(isAuthenticated, confirmTickets);
ticketRouter.route("/:ticketId").delete(isAuthenticated, cancelTicket);
ticketRouter.route("/payment_failed/:slotId").delete(isAuthenticated, paymentFailed);


export default ticketRouter;