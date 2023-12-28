import express from 'express';
import { userStats } from '../controllers/miscellaneousController.js';
import { authorizedRoles, isLoggedIn } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.route('/admin/stats/users').get(isLoggedIn, authorizedRoles('ADMIN'), userStats);

export default router;