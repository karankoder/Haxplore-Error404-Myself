import express from 'express';
import { paymentOrders, paymentSuccess } from '../controllers/paymentController.js';

const paymentRouter = express.Router();

paymentRouter.post("/orders", paymentOrders);
paymentRouter.post("/success", paymentSuccess);

export default paymentRouter;