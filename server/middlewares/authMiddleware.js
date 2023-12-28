import jwt from "jsonwebtoken";
import AppError from "../utils/error.js";

export const isLoggedIn = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new AppError("please login", 401));
  }

  const decode = await jwt.verify(token, process.env.JWT_SECRET);

  req.user = decode;

  next();
};

export const authorizedRoles =
  (...roles) =>
  async (req, res, next) => {
    const currentUserRole = req.user.role;

    if (!roles.includes(currentUserRole)) {
      return next(
        new AppError("You are not authorized to access this route", 403)
      );
    }

    next();
  };

export const authorizeSubscribers = async (req, res, next) => {
    // If user is not admin or does not have an active subscription then error else pass
    if (req.user.role !== "ADMIN" && req.user.subscription.status !== "active") {
      return next(new AppError("Please subscribe to access this route.", 403));
    }
  
    next();
};
