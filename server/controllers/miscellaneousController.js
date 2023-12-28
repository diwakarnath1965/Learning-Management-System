import User from "../models/User.js";

export const userStats = async (req, res, next) => {
    const allUsersCount = await User.countDocuments();
  
    const subscribedUsersCount = await User.countDocuments({
      'subscription.status': 'active',
    });
  
    res.status(200).json({
      success: true,
      message: 'All registered users count',
      allUsersCount,
      subscribedUsersCount,
    });
};