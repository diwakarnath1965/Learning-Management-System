import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please enter your Name"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Please enter your Email"],
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Please enter your Password"],
      select: false,
    },

    avatar: {
      public_id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },

    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },

    forgetPasswordToken: String,
    forgetPasswordExpiry: Date,

    subscription: {
      id: String,
      status: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods = {
  generatejwttoken: async function () {
    return await jwt.sign(
      {
        id: this._id,
        email: this.email,
        subscription: this.subscription,
        role: this.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );
  },

  comparePassword: async function (password) {
    return await bcrypt.compare(password, this.password);
  },

  generateResetPasswordToken: async function () {

    const resetToken = crypto.randomBytes(20).toString("hex");

    this.forgetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.forgetPasswordExpiry = Date.now() + 15 * 60 * 1000

    return resetToken;
  }
};

export default mongoose.model("User", userSchema);
