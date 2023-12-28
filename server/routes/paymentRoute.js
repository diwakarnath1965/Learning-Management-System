import express from 'express';
const router = express.Router();
import {allPayments, buySubscription, cancelsubscription, getRazorPayApiKey, verifySubscription} from "../controllers/paymentController.js"
import { authorizeSubscribers, authorizedRoles, isLoggedIn } from '../middlewares/authMiddleware.js';


router.route("/razorpay-key").get(isLoggedIn,getRazorPayApiKey);
router.route("/subscribe").post(isLoggedIn,buySubscription);
router.route("/verify").post(isLoggedIn,verifySubscription);
router.route("/unsubscribe").post(isLoggedIn,authorizeSubscribers,cancelsubscription);
router.route("/").get(isLoggedIn,authorizedRoles("ADMIN"),allPayments);

export default router;