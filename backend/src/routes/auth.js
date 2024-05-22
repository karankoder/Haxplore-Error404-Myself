import express from "express";
import passport from "passport";
import GoogleTokenStrategy from "passport-google-oauth-token";
import { authHandler, googleStrategyHandler, sendOtp, verifyOtp } from "../controllers/auth.js";
import dotenv from "dotenv";
import { User } from "../models/user.js";
dotenv.config();

passport.serializeUser(async (userPromise, done) => {
    const user = await userPromise;
    done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

passport.use(new GoogleTokenStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
}, googleStrategyHandler));

const router = express.Router();

router.post('/google', passport.authenticate('google-oauth-token'), authHandler);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);

export default router;