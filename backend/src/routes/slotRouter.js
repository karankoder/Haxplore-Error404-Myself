import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { createSlots, updateSlot, getSlot } from "../controllers/slotController.js";

const slotRouter = express.Router();

slotRouter.post("/", isAuthenticated, createSlots);
slotRouter.route("/:id").patch(isAuthenticated, updateSlot).get(getSlot);

export default slotRouter;