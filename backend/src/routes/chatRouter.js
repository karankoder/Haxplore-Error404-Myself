
import express from "express";
import { chatResponse } from "../controllers/chatController.js";
const chatRouter = express.Router();

chatRouter.route("/").post(chatResponse);

export default chatRouter;