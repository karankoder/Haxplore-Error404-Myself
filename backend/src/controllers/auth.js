import { Otp } from "../models/otp.js";
import { User } from "../models/user.js";
import { sendJwt } from "../utils/sendJwt.js";
import twilio from "twilio";

export const googleStrategyHandler = async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ email: profile._json.email });
        if (user) return done(null, user);
        user = await User.create({
            name: profile._json.name,
            email: profile._json.email,
            googleId: profile.id
        })
        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
}

export const authHandler = async (req, res, next) => {
    if (!req.user) return next(new ErrorHandler("Error authenticating user", 401));
    sendJwt(await req.user, res, 200);
}

export const sendOtp = async (req, res, next) => {
    try {
        const accountSid = process.env.TWILIO_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const client = twilio(accountSid, authToken);
        const { mobileNumber } = req.body;
        const otp = Math.floor(100000 + Math.random() * 900000);
        await client.messages
            .create({
                body: `\nYour OTP for verification: ${otp}\nExpires in 5 min.`,
                from: '+15022521912',
                to: '+91' + mobileNumber
            })
        let otpDoc = await Otp.findOne({ mobileNumber });
        console.log(otpDoc);
        if (!otpDoc) {
            otpDoc = await Otp.create({ mobileNumber, otp });
        }
        else {
            otpDoc.otp = otp;
            await otpDoc.save();
        }
        console.log(otpDoc);
        res.status(201).json({
            message: "Otp sent successfully!"
        })
    } catch (error) {
        next(error);
    }
}

export const verifyOtp = async (req, res, next) => {
    try {
        const { otp, mobileNumber } = req.body;
        const otpDoc = await Otp.findOne({
            mobileNumber,
            otp
        });
        if (!otpDoc || otpDoc.otp !== otp) {
            return res.status(404).json({
                message: "Incorrect Otp or Otp got expired"
            })
        }
        let user = await User.findOne({ mobileNumber });
        if (!user) {
            user = await User.create({
                mobileNumber
            });
        }
        sendJwt(user, res, 200);
    } catch (error) {
        next(error);
    }
}