import errorHandler from "../middleware/errorHandler.js";
import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, password, organizationId } = req.body;
  //validation
  if (!username || !password) {
    return next(errorHandler(400, "Please fill all the required field."));
  }

  //validation
  if (password.length < 6) {
    return next(errorHandler(400, "Password must be at least 6 character"));
  }

  try {
    //check email exist or not
    const existUsername = await UserModel.findOne({ username });
    if (existUsername) {
      return next(errorHandler(409, "This username is already used."));
    }

    const hashedPass = bcryptjs.hashSync(password, 10);

    const newUser = new UserModel({
      username,
      password: hashedPass,
      organizationId,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign(
      { id: savedUser._id, role: savedUser.role, organizationId },
      process.env.COOKIE_SECRET_KEY
    );

    const { password: hashedPassword, ...rest } = savedUser._doc;

    return res
      .status(201)
      .cookie("userTokenTask", token, { httpOnly: true })
      .json({
        success: true,
        message: "Registration successful",

        user: rest,
      });
  } catch (error) {
    return next(error);
  }
};

export const signin = async (req, res, next) => {
  const { username, password } = req.body;

  //validation
  if (!username || !password) {
    return next(errorHandler(400, "Please fill all the required field."));
  }

  try {
    const validUser = await UserModel.findOne({ username });
    if (!validUser) {
      return next(errorHandler(404, "Username or password is invalid"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Username or password is invalid"));
    }
    const token = jwt.sign(
      {
        id: validUser._id,
        role: validUser.role,
        organizationId: validUser.organizationId,
      },
      process.env.COOKIE_SECRET_KEY
    );

    const { password: hashedPassword, ...rest } = validUser._doc;

    return res
      .status(200)
      .cookie("userTokenTask", token, { httpOnly: true })
      .json({
        success: true,
        message: "Login Successfully",
        user: rest,
      });
  } catch (error) {
    return next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    return res
      .status(200)
      .clearCookie("userTokenTask")
      .json({ success: true, message: "Logout successfully" });
  } catch (error) {
    return next(error);
  }
};
