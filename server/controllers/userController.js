import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.utils.js";


// **************** SIGN UP ****************
export const signup = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      password: hashedPassword,
      email
    });
    await newUser.save();
    
    res.status(201).json({ message: "User created successfully" });
  } catch (error){
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// **************** LOGIN ****************
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not found" });

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(401).json({ message: "Email or password incorrect" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();
    // console.log(user.name);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true
    });
    return res.status(200).json({ message: "User login successfully", email: user.email, name: user.name, id: user._id});
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

export const logout = async (req, res) => {

  await User.findByIdAndUpdate(req.user?._id, { refreshToken: null });
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict"
  });
  return res.status(200).json({ message: "Logged out successfully" });
}

export const protectedRoute = async (req, res) => {
  try {
    if(!req.user){
      return res.status(401).json({ message: "Unauthorized" });
    }

    return res.status(200).json({ message: "access granted!", user: {
      id: req.user._id,
      name: req.user.name
    }});
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

export const refresh = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if(!refreshToken) return res.status(401).json({ message: "No refresh token" });
  try {
    const user = await User.findOne({ refreshToken });
    if(!user) return res.status(403).json({ message: "Invalid refresh token" });

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = generateAccessToken(user);
    res.json({ accessToken});
  } catch (error) {
    
  }
}

export const getCurrentUser = async (req, res) => {
  const { user } = req;
  if(!user) return res.status(401).json({ message: "Unauthorized" });
  return res.status(200).json({ user });
}