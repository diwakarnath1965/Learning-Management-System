import AppError from "../utils/error.js";
import User from "../models/User.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";

const cookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: true,
};

export const register = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return next(new AppError("Please enter all fields", 400));
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return next(new AppError("User already exists", 400));
    }

    const user = await User.create({
      fullName,
      email,
      password,
      avatar: {
        public_id: email,
        secure_url:
          "https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg",
      },
    });

    if (!user) {
      return next(
        new AppError("User registration failed, please try again!!", 500)
      );
    }

    // todo file upload

    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "learning management system",
          width: 250,
          height: 250,
          gravity: "faces",
          crop: "fill",
        });

        if (result) {
          user.avatar.public_id = result.public_id;
          user.avatar.secure_url = result.secure_url;

          fs.rm(`uploads/${req.file.filename}`);
        }
      } catch (error) {
        return next(new AppError("File not uploaded", 500));
      }
    }

    await user.save();

    user.password = undefined;

    const token = await user.generatejwttoken();

    res.cookie("token", token, cookieOptions);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("Please enter all fields", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new AppError("User not exist", 401));
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return next(new AppError("Invalid Credentials", 401));
    }

    const token = await user.generatejwttoken();
    user.password = undefined;

    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const logout = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      maxAge: 0,
      httpOnly: true,
      secure: true,
    });

    res.status(200).json({
      success: true,
      message: "User Logged out successfull",
    });
  } catch (error) {
    return next(new AppError(error.message, 401));
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    res.status(200).json({
      success: true,
      message: "Profile fetched Successfully",
      user,
    });
  } catch (error) {
    return next(new AppError(error.message, 401));
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return next(new AppError("Please enter email", 400));
    }

    const user = await User.findOne({ email });

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    const resetToken = await user.generateResetPasswordToken();

    await user.save();

    const resetPasswordURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const subject = "Reset Password Request";
    const message = `Hi ${user.fullName}, <br><br> Please click on the link below to reset your password: <br><br> <a href=${resetPasswordURL} clicktracking=off>${resetPasswordURL}</a>`;
    try {
      await sendEmail(email, subject, message);

      res.status(200).json({
        success: true,
        message: `Reset password link sent to ${email} successfully`,
      });
    } catch (error) {
      user.forgetPasswordToken = undefined;
      user.forgetPasswordExpiry = undefined;

      await user.save();

      return next(new AppError("Email not sent", 500));
    }
  } catch (error) {
    return next(new AppError(error.message, 401));
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { resetToken } = req.params
    const { password } = req.body

    if (!password) {
      return next(new AppError("Please enter all fields", 400));
    }

    const forgetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    const user = await User.findOne({ forgetPasswordToken, forgetPasswordExpiry: { $gt: Date.now() } })

    if (!user) {
      return next(new AppError("Invalid reset token", 400));
    }

    user.password = password
    user.forgetPasswordToken = undefined
    user.forgetPasswordExpiry = undefined

    await user.save()

    res.status(200).json({
      success: true,
      message: "Password reset successfully"
    })

  } catch (error) {
    return next(new AppError(error.message, 401));
  }
};


export const changePassword = async (req, res, next) => {
  try {
    const {id} = req.user

    const {oldPassword, newPassword} = req.body

    if (!oldPassword || !newPassword) {
      return next(new AppError("Please enter all fields", 400));
    }

    const user = await User.findById(id).select("+password")

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    const isMatch = await user.comparePassword(oldPassword)

    if (!isMatch) {
      return next(new AppError("Invalid old password", 400));
    }

    user.password = newPassword

    await user.save()

    user.password = undefined

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
      user
    })

  } catch (error) {
    
  }
}

export const updateProfile = async (req, res, next) => {
  try {
    const {id} = req.params
    const {fullName} = req.body

    const user = await User.findById(id)

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    if(fullName) {
      user.fullName = fullName
    }

    if(req.file) {
      await cloudinary.v2.uploader.destroy(user.avatar.public_id)

      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "learning management system",
          width: 250,
          height: 250,
          gravity: "faces",
          crop: "fill",
        });

        if (result) {
          user.avatar.public_id = result.public_id;
          user.avatar.secure_url = result.secure_url;

          fs.rm(`uploads/${req.file.filename}`);
        }
      } catch (error) {
        return next(new AppError("File not uploaded", 500));
      }
    }

    await user.save()

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user
    })


  } catch (error) {
    return next(new AppError(error.message, 401));
  }
}