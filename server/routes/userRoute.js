import express from 'express';
import { changePassword, forgotPassword, getProfile, login, logout, register, resetPassword, updateProfile } from '../controllers/userController.js';
import { isLoggedIn } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multerMiddleware.js';
const router = express.Router()

router.post('/register', upload.single("avatar"), register)
router.route("/login").post(login)
router.route("/logout").post(logout)
router.route("/me").get(isLoggedIn,getProfile)
router.route("/reset").post(forgotPassword)
router.route("/reset/:resetToken").post(resetPassword)
router.route("/change-password").post(isLoggedIn,changePassword)
router.route("/update/:id").put(isLoggedIn,upload.single("avatar"),updateProfile)


export default router;