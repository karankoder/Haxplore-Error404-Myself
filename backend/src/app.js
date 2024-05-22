import express from "express";
import dotenv from "dotenv";
import dev_populatedata from "./dev_populatedata.js";
import eventRouter from "./routes/eventRouter.js";
import ticketRouter from "./routes/ticketRouter.js";
import slotRouter from "./routes/slotRouter.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import authRouter from "./routes/auth.js";
import { errorMiddleware } from "./middlewares/error.js";

import chatRouter from "./routes/chatRouter.js";
import paymentRouter from "./routes/payment.js";
export const app = express();
app.use(cors({}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
    cors({
        origin: ["*"],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true,
    }));
app.use(session({
    secret: process.env.SECRET_KEY,
    saveUninitialized: true,
    resave: false
}));
app.use(passport.initialize());
app.use(passport.session())

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.use("/auth", authRouter);
app.use("/events", eventRouter);
app.use("/tickets", ticketRouter);
app.use("/chat", chatRouter);
app.use("/slot", slotRouter);
app.use("/payment", paymentRouter);

app.use(errorMiddleware);

if(process.env.NODE_ENV === "dev")
dev_populatedata();
